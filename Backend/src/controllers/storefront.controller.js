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

        // --- Premium Features ---
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
        paymentStatus: "Unpaid", 
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

    // --- 6. PAYSTACK DYNAMIC SPLIT PAYMENT ---
    if (paymentMethod === "paystack") {
      if (!vendor.accountNumber || !vendor.bankCode) {
        return res.status(400).json({
          message: "This vendor has not set up online payments yet. Please choose Bank Transfer.",
        });
      }

      let subaccountCode = vendor.paystackSubaccountCode;

      // Create a subaccount if they don't have one
      // We no longer care about the percentage_charge here because we override it below!
      if (!subaccountCode) {
        const subaccountRes = await axios.post(
          "https://api.paystack.co/subaccount",
          {
            business_name: vendor.accountName,
            settlement_bank: vendor.bankCode,
            account_number: vendor.accountNumber,
            percentage_charge: 0.1, // Dummy value, gets ignored by transaction_charge
            description: `SabiSell Vendor: ${vendor.storeName || vendor.accountName}`,
          },
          { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
        );

        subaccountCode = subaccountRes.data.data.subaccount_code;

        await prisma.vendor.update({
          where: { id: vendor.id },
          data: { paystackSubaccountCode: subaccountCode },
        });
      }

      // --- NEW: DYNAMIC FEE MATH ---
      let sabiPlatformFee = 0; // The cut SabiSell takes (in Naira)

      if (vendor.plan === 'FREE') {
        // Free: 3% of total (No Cap)
        sabiPlatformFee = totalAmount * 0.03; 
      } 
      else if (vendor.plan === 'STARTER') {
        // Starter: 1.5% of total, but CAPPED at ₦3,000 maximum
        sabiPlatformFee = totalAmount * 0.015;
        if (sabiPlatformFee > 3000) {
          sabiPlatformFee = 3000; // Hit the ceiling!
        }
      }
      else if (vendor.plan === 'GROWTH') {
        // Growth: 0% Platform fee
        sabiPlatformFee = 0; 
      }

      // Paystack requires charges in kobo (multiply by 100)
      const transactionChargeKobo = Math.round(sabiPlatformFee * 100);
      const amountInKobo = Math.round(totalAmount * 100);
      // -----------------------------

      const frontendUrl = req.headers.origin || "http://localhost:5173";

      const paymentRes = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: customerEmail,
          amount: amountInKobo,
          reference: generatedOrderNumber,
          subaccount: subaccountCode, 
          
          // 👇 THIS OVERRIDES THE SUBACCOUNT FEE AUTOMATICALLY 👇
          transaction_charge: transactionChargeKobo, 
          bearer: "subaccount", // The vendor bears Paystack's gateway fees
          
          callback_url: `${frontendUrl}/store/${slug}/checkout/success`, 
          metadata: {
            custom_fields: [
              { display_name: "Order Number", variable_name: "order_number", value: generatedOrderNumber },
              { display_name: "Vendor ID", variable_name: "vendor_id", value: vendor.id },
            ],
          },
        },
        { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
      );

      console.log("PAYSTACK RESPONSE REFERENCE:", paymentRes.data.data.reference);

      await prisma.order.update({
        where: { id: newOrder.id },
        data: { paymentReference: generatedOrderNumber },
      });

      return res.status(201).json({
        success: true,
        order: newOrder,
        access_code: paymentRes.data.data.access_code,
        reference: paymentRes.data.data.reference,
        publicKey: process.env.PAYSTACK_PUBLIC_KEY,
      });
    }
  } catch (error) {
    console.error("CHECKOUT ERROR DETAILS:", error.response?.data || error);
    res.status(500).json({ message: "Server error processing order", error: error.message });
  }
};