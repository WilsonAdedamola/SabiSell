const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios"); 

exports.paystackWebhook = async (req, res) => {
  try {
    // 1. Verify Signature
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(req.body)).digest("hex");
    
    if (hash !== req.headers["x-paystack-signature"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    res.sendStatus(200); 

    const event = req.body;
    
    if (event.event === "charge.success") {
      const { reference } = event.data; 

      // 2. VERIFY TRANSACTION WITH PAYSTACK API
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
      });

      const transactionData = response.data.data;
      const metadata = transactionData.metadata;

      console.log("Verified Metadata:", metadata);

      // 3. Find order using the Order Number from metadata
      const orderNumberField = metadata?.custom_fields?.find(f => f.variable_name === "order_number");
      
      if (orderNumberField) {
        const orderNumber = orderNumberField.value;

        // 4. Update the database!
        const updateResult = await prisma.order.updateMany({
          where: { orderNumber: orderNumber },
          data: { paymentStatus: "Paid" },
        });

        // 5. Fire off the Notification
        if (updateResult.count > 0) {
          // FIX: Fetch the actual order so we have the vendorId for the notification
          const paidOrder = await prisma.order.findFirst({
            where: { orderNumber: orderNumber }
          });

          if (paidOrder && paidOrder.vendorId) {
            await prisma.notification.create({
              data: {
                vendorId: paidOrder.vendorId,
                type: "payment",
                title: "Payment Received! 💰",
                message: `Order ${paidOrder.orderNumber} has been successfully paid. The funds are splitting to your account.`,
                link: "/dashboard/orders/",
                // link: `/dashboard/orders/${paidOrder.orderNumber}`,
              },
            });
          }
        }
      }
    }
  } catch (error) {
    console.error("🚨 WEBHOOK ERROR:", error);
  }
};
