const prisma = require("../config/db");
const axios = require("axios");

// @route   GET /api/storefront/:storeLink
// @desc    Get public store details and active products
exports.getStoreByLink = async (req, res) => {
  try {
    const { storeLink } = req.params;

    // Find the vendor by their store link
    const store = await prisma.vendor.findUnique({
      where: { storeLink },
      select: {
        id: true,
        storeName: true,
        storeDescription: true,
        logoUrl: true,
        themeColor: true,

        // --- Hero Banner ---
        hasBanner: true,
        bannerImage: true,
        bannerTitle: true,
        bannerSubtitle: true,
        bannerDiscount: true,

        // --- NEW: Premium Features ---
        plan: true,
        enableSlideshow: true,
        slideshowImages: true,
        enableSecondaryBanner: true,
        secondaryBannerTitle: true,
        secondaryBannerDesc: true,
        secondaryBannerImage: true,

        // --- Contact & Business ---
        whatsapp: true,
        instagram: true,
        facebook: true,
        twitter: true,
        tiktok: true,
        snapchat: true,
        phone: true,
        email: true,
        businessName: true,
        businessAddress: true,
        showBusinessDetails: true,
        isOnline: true,
        deliveryFee: true,
        deliveryTime: true,

        // Only fetch ACTIVE products
        products: {
          where: { status: "ACTIVE" },
          orderBy: { createdAt: "desc" },
        },

        // Fetch store categories
        categories: true,
      },
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    if (!store.isOnline) {
      return res
        .status(403)
        .json({ message: "This store is currently offline." });
    }

    res.status(200).json({ store });
  } catch (error) {
    console.error("Storefront Fetch Error:", error);
    res.status(500).json({ message: "Error loading store." });
  }
};

// @route   POST /api/storefront/:slug/checkout
// @desc    Process a buyer's cart, create order, and init Paystack
exports.processCheckout = async (req, res) => {
  try {
    const { slug } = req.params;

    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      subtotal,
      deliveryFee,
      totalAmount,
      deliveryMethod,
      paymentMethod,
      customerNote,
    } = req.body;

    // 1. Find the Vendor
    const vendor = await prisma.vendor.findUnique({
      where: { storeLink: slug },
    });

    if (!vendor) {
      return res.status(404).json({ message: "Store not found" });
    }

    // 2. Check if customer exists in the CRM, or create them
    let customer = await prisma.customer.findFirst({
      where: { vendorId: vendor.id, email: customerEmail },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          vendorId: vendor.id,
          fullName: customerName,
          email: customerEmail,
          phone: customerPhone,
          address: shippingAddress?.city || "Online",
        },
      });
    }

    // 3. Generate Order Number
    const generatedOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    // 4. Create Order & Items in one transaction
    const newOrder = await prisma.order.create({
      data: {
        vendorId: vendor.id,
        customerId: customer.id,
        orderNumber: generatedOrderNumber,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: shippingAddress || {},
        customerNote: customerNote || null,

        subtotal: parseFloat(subtotal) || 0,
        deliveryFee: parseFloat(deliveryFee) || 0,
        totalAmount: parseFloat(totalAmount) || 0,

        deliveryMethod,
        paymentMethod,
        paymentStatus: "Unpaid", // Order is Unpaid until Paystack confirms
        status: "Pending",

        items: {
          create: items.map((item) => ({
            productId: String(item.productId),
            name: String(item.name),
            size: item.size ? String(item.size) : null,
            color: item.color ? String(item.color) : null,
            image: item.image ? String(item.image) : null,
            quantity: parseInt(item.quantity, 10),
            priceAtPurchase: parseFloat(item.price),
          })),
        },
      },
    });

    // --- 6. PAYSTACK SPLIT PAYMENT INITIALIZATION ---
    if (paymentMethod === "paystack") {
      // Safety check: Does the vendor have a bank account saved?
      if (!vendor.accountNumber || !vendor.bankCode) {
        return res.status(400).json({
          message:
            "This vendor has not set up online payments yet. Please choose Bank Transfer.",
        });
      }

      let subaccountCode = vendor.paystackSubaccountCode;

      // Create a subaccount on the fly if they don't have one
      if (!subaccountCode) {
        const subaccountRes = await axios.post(
          "https://api.paystack.co/subaccount",
          {
            business_name: vendor.accountName,
            settlement_bank: vendor.bankCode,
            account_number: vendor.accountNumber,
            percentage_charge: 3.0, // SabiSell Platform Fee
            description: `SabiSell Vendor: ${vendor.storeName || vendor.accountName}`,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
          },
        );

        subaccountCode = subaccountRes.data.data.subaccount_code;

        await prisma.vendor.update({
          where: { id: vendor.id },
          data: { paystackSubaccountCode: subaccountCode },
        });
      }

      // Initialize the transaction
      const amountInKobo = Math.round(totalAmount * 100);

      // Dynamically get the frontend URL for redirection after payment
      const frontendUrl = req.headers.origin || "http://localhost:5173";

      const paymentRes = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: customerEmail,
          amount: amountInKobo,
          reference: generatedOrderNumber,
          subaccount: subaccountCode, // The split happens here
          bearer: "subaccount",
          callback_url: `${frontendUrl}/store/${slug}/checkout/success`, // Where Paystack redirects them after payment
          metadata: {
            custom_fields: [
              {
                display_name: "Order Number",
                variable_name: "order_number",
                value: generatedOrderNumber,
              },
              {
                display_name: "Vendor ID",
                variable_name: "vendor_id",
                value: vendor.id,
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        },
      );

      console.log("PAYSTACK RESPONSE REFERENCE:", paymentRes.data.data.reference);

      const updateResult = await prisma.order.update({
        where: { id: newOrder.id },
        data: {
          paymentReference: generatedOrderNumber,
        },
      });

      console.log("DATABASE SAVE RESULT:", updateResult);

      // Return the Paystack URL to the frontend!
      return res.status(201).json({
        success: true,
        order: newOrder,
        access_code: paymentRes.data.data.access_code,
        reference: paymentRes.data.data.reference,
        publicKey: process.env.PAYSTACK_PUBLIC_KEY,
        // authorization_url: paymentRes.data.data.authorization_url
      });
    }
  } catch (error) {
    console.error("CHECKOUT ERROR DETAILS:", error.response?.data || error);
    res
      .status(500)
      .json({ message: "Server error processing order", error: error.message });
  }
};

// // @route   POST /api/storefront/:slug/checkout
// // @desc    Process a buyer's cart and create a new order
// exports.processCheckout = async (req, res) => { // <--- async is right here!
//   try {
//     const { slug } = req.params;

//     const {
//       customerName, customerEmail, customerPhone,
//       shippingAddress, items, subtotal, deliveryFee,
//       totalAmount, deliveryMethod, paymentMethod, customerNote
//     } = req.body;

//     // 1. Find the Vendor
//     const vendor = await prisma.vendor.findUnique({
//       where: { storeLink: slug }
//     });

//     if (!vendor) {
//       return res.status(404).json({ message: 'Store not found' });
//     }

//     // 2. Check if customer exists in the CRM, or create them
//     let customer = await prisma.customer.findFirst({
//       where: { vendorId: vendor.id, email: customerEmail }
//     });

//     if (!customer) {
//       customer = await prisma.customer.create({
//         data: {
//           vendorId: vendor.id,
//           fullName: customerName,
//           email: customerEmail,
//           phone: customerPhone,
//           address: shippingAddress?.city || "Online"
//         }
//       });
//     }

//     // 3. Generate Order Number
//     const generatedOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

//     // 4. Create Order & Items in one transaction
//     const newOrder = await prisma.order.create({
//       data: {
//         vendorId: vendor.id,
//         customerId: customer.id,
//         orderNumber: generatedOrderNumber,
//         customerName,
//         customerEmail,
//         customerPhone,
//         shippingAddress: shippingAddress || {},
//         customerNote: customerNote || null,

//         subtotal: parseFloat(subtotal) || 0,
//         deliveryFee: parseFloat(deliveryFee) || 0,
//         totalAmount: parseFloat(totalAmount) || 0,

//         deliveryMethod,
//         paymentMethod,
//         status: 'Pending',

//         items: {
//           create: items.map(item => ({
//             productId: String(item.productId),
//             name: String(item.name),
//             size: item.size ? String(item.size) : null,
//             color: item.color ? String(item.color) : null,
//             image: item.image ? String(item.image) : null,
//             quantity: parseInt(item.quantity, 10),
//             priceAtPurchase: parseFloat(item.price)
//           }))
//         }
//       }
//     });

//     // 5. FIRE OFF THE NOTIFICATION TO THE VENDOR
//     await prisma.notification.create({
//       data: {
//         vendorId: vendor.id,
//         type: "order",
//         title: "New Order Received 🎉",
//         message: `You just received a new order (${generatedOrderNumber}) for ₦${parseFloat(totalAmount).toLocaleString()} from ${customerName}.`,
//         link: "/dashboard/orders"
//       }
//     });

//     res.status(201).json({ success: true, order: newOrder });

//   } catch (error) {
//     console.error("CHECKOUT ERROR DETAILS:", error);
//     res.status(500).json({ message: 'Server error processing order', error: error.message });
//   }
// };
