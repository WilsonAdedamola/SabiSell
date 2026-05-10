// Backend/controllers/storefront.controller.js
const prisma = require("../config/db");

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
          orderBy: { createdAt: 'desc' }
        },
        
        // Fetch store categories
        categories: true 
      }
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    if (!store.isOnline) {
      return res.status(403).json({ message: "This store is currently offline." });
    }

    res.status(200).json({ store });
  } catch (error) {
    console.error("Storefront Fetch Error:", error);
    res.status(500).json({ message: "Error loading store." });
  }
};

// @route   POST /api/storefront/:slug/checkout
// @desc    Process a buyer's cart and create a new order
exports.processCheckout = async (req, res) => { // <--- async is right here!
  try {
    const { slug } = req.params;
    
    const { 
      customerName, customerEmail, customerPhone, 
      shippingAddress, items, subtotal, deliveryFee, 
      totalAmount, deliveryMethod, paymentMethod, customerNote 
    } = req.body;

    // 1. Find the Vendor
    const vendor = await prisma.vendor.findUnique({
      where: { storeLink: slug }
    });

    if (!vendor) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // 2. Check if customer exists in the CRM, or create them
    let customer = await prisma.customer.findFirst({
      where: { vendorId: vendor.id, email: customerEmail }
    });
    
    if (!customer) {
      customer = await prisma.customer.create({
        data: { 
          vendorId: vendor.id, 
          fullName: customerName, 
          email: customerEmail, 
          phone: customerPhone, 
          address: shippingAddress?.city || "Online" 
        }
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
        status: 'Pending',
        
        items: {
          create: items.map(item => ({
            productId: String(item.productId), 
            name: String(item.name),
            size: item.size ? String(item.size) : null,
            color: item.color ? String(item.color) : null,
            image: item.image ? String(item.image) : null,
            quantity: parseInt(item.quantity, 10),
            priceAtPurchase: parseFloat(item.price)
          }))
        }
      }
    });

    // 5. FIRE OFF THE NOTIFICATION TO THE VENDOR
    await prisma.notification.create({
      data: {
        vendorId: vendor.id,
        type: "order",
        title: "New Order Received 🎉",
        message: `You just received a new order (${generatedOrderNumber}) for ₦${parseFloat(totalAmount).toLocaleString()} from ${customerName}.`,
        link: "/dashboard/orders"
      }
    });

    res.status(201).json({ success: true, order: newOrder });

  } catch (error) {
    console.error("CHECKOUT ERROR DETAILS:", error);
    res.status(500).json({ message: 'Server error processing order', error: error.message });
  }
};