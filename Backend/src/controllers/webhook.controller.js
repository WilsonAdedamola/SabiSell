const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
const sendEmail = require("../utils/sendEmail");

exports.paystackWebhook = async (req, res) => {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.sendStatus(200);

    const event = req.body;

    if (event.event === "charge.success") {
      const { reference } = event.data;

      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        },
      );

      const transactionData = response.data.data;
      const metadata = transactionData.metadata;

      const orderNumberField = metadata?.custom_fields?.find(
        (f) => f.variable_name === "order_number",
      );

      if (orderNumberField) {
        const orderNumber = orderNumberField.value;

        const updateResult = await prisma.order.updateMany({
          where: { orderNumber: orderNumber },
          data: { paymentStatus: "Paid" },
        });

        if (updateResult.count > 0) {
          const paidOrder = await prisma.order.findFirst({
            where: { orderNumber: orderNumber },
            include: { items: true, vendor: true }, //  Fetch the order items!
          });

          if (paidOrder) {
            // INVENTORY DEDUCTION & ALERTS LOGIC
            for (const item of paidOrder.items) {
              try {
                // 1. Deduct the stock and return the newly updated product
                const updatedProduct = await prisma.product.update({
                  where: { id: item.productId },
                  data: {
                    stockQuantity: { decrement: item.quantity }, // Ensure this matches your schema (stockQuantity)
                  },
                });

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

                  // AUTOMATED EMAILS

                  // 1. Send Customer Receipt
                  await sendEmail({
                    email: paidOrder.customerEmail,
                    subject: `Receipt for Order ${paidOrder.orderNumber}`,
                    html: `
                <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                  <h2 style="color: #044e3b;">Payment Successful 🎉</h2>
                  <p>Hi <strong>${paidOrder.customerName}</strong>,</p>
                  <p>Thank you for shopping at <strong>${paidOrder.vendor.storeName}</strong>. We have received your payment.</p>
                  
                  <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase;">Order Number</p>
                    <h3 style="margin: 5px 0 15px 0;">${paidOrder.orderNumber}</h3>
                    
                    <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase;">Amount Paid</p>
                    <h2 style="margin: 5px 0 0 0; color: #111827;">₦${paidOrder.totalAmount.toLocaleString()}</h2>
                  </div>
                  
                  <p style="font-size: 14px; color: #4b5563;">We will contact you shortly. We will prepare your items for ${paidOrder.deliveryMethod} delivery.</p>
                  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                  <a href="https://sabisell.vercel.app" style="font-size: 10px; color: #9ca3af; text-align: center;">Powered securely by SabiSell</a>
                </div>
              `,
                  });

                  // 2. Send Vendor Alert
                  if (paidOrder.vendor && paidOrder.vendor.email) {
                    await sendEmail({
                      email: paidOrder.vendor.email,
                      subject: `💰 New Paid Order (${paidOrder.orderNumber})`,
                      html: `
                  <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #044e3b;">You made a sale 💸</h2>
                    <p>Great news! <strong>${paidOrder.customerName}</strong> just paid <strong>₦${paidOrder.totalAmount.toLocaleString()}</strong>.</p>
                    <p><strong>Order Number:</strong> ${paidOrder.orderNumber}</p>
                    <p>Log in to your SabiSell dashboard to view the delivery details and fulfill this order. Contact the customer for any inquiries.</p>
                    <br/>
                    <a href="https://sabisell.vercel.app/dashboard/orders" style="display: inline-block; background-color: #044e3b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Order Dashboard</a>
                  </div>
                `,
                    });
                  }
                }
              } catch (err) {
                console.error(
                  `Failed to process stock/alerts for product ${item.productId}:`,
                  err,
                );
              }
            }

            // Notification
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
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
  }
};
