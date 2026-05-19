const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios"); 

exports.paystackWebhook = async (req, res) => {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(req.body)).digest("hex");
    
    if (hash !== req.headers["x-paystack-signature"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    res.sendStatus(200); 

    const event = req.body;
    
    if (event.event === "charge.success") {
      const { reference } = event.data; 

      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
      });

      const transactionData = response.data.data;
      const metadata = transactionData.metadata;

      const orderNumberField = metadata?.custom_fields?.find(f => f.variable_name === "order_number");
      
      if (orderNumberField) {
        const orderNumber = orderNumberField.value;

        const updateResult = await prisma.order.updateMany({
          where: { orderNumber: orderNumber },
          data: { paymentStatus: "Paid" },
        });

        console.log("Database Update Count:", updateResult.count);

        if (updateResult.count > 0) {
          // FIX 1: Include the items when fetching the order so we know what to deduct
          const paidOrder = await prisma.order.findFirst({
            where: { orderNumber: orderNumber },
            include: { items: true } // <--- Fetch the order items!
          });

          if (paidOrder) {
            
            // --- INVENTORY DEDUCTION & ALERTS LOGIC ---
            for (const item of paidOrder.items) {
              try {
                // 1. Deduct the stock and return the newly updated product
                const updatedProduct = await prisma.product.update({
                  where: { id: item.productId },
                  data: {
                    stockQuantity: { decrement: item.quantity } // Ensure this matches your schema (stockQuantity)
                  }
                });
                
                console.log(`Deducted ${item.quantity} from product ${item.productId}. New stock: ${updatedProduct.stockQuantity}`);

                // 2. OUT OF STOCK ALERT
                if (updatedProduct.stockQuantity <= 0) {
                  await prisma.notification.create({
                    data: {
                      vendorId: paidOrder.vendorId,
                      type: "inventory",
                      title: "Out of Stock",
                      message: `Your product "${updatedProduct.name}" is completely sold out. You may want to remove it from your storefront.`,
                      link: "/dashboard/products/",
                    },
                  });
                  console.log(`Sent Out of Stock alert for ${updatedProduct.name}`);
                } 
                // 3. LOW STOCK ALERT (< 5 items)
                else if (updatedProduct.stockQuantity < 5) {
                  await prisma.notification.create({
                    data: {
                      vendorId: paidOrder.vendorId,
                      type: "inventory",
                      title: "⚠️ Low Stock Warning",
                      message: `Your product "${updatedProduct.name}" is running low. Only ${updatedProduct.stockQuantity} left in stock.`,
                      link: "/dashboard/products/",
                    //   link: `/dashboard/products/${updatedProduct.id}`,
                    },
                  });
                  console.log(`Sent Low Stock alert for ${updatedProduct.name}`);
                }

              } catch (err) {
                console.error(`Failed to process stock/alerts for product ${item.productId}:`, err);
              }
            }
            // ---------------------------------------

            // Fire off the Notification
            if (paidOrder.vendorId) {
              await prisma.notification.create({
                data: {
                  vendorId: paidOrder.vendorId,
                  type: "payment",
                  title: "Payment Received! 💰",
                  message: `Order ${paidOrder.orderNumber} has been successfully paid.`,
                  link: "/dashboard/orders/",
                //   link: `/dashboard/orders/${paidOrder.orderNumber}`,
                },
              });
              console.log("✅ Notification successfully sent to vendor!");
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("🚨 WEBHOOK ERROR:", error);
  }
};