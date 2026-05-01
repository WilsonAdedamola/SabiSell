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
        hasBanner: true,
        bannerImage: true,
        bannerTitle: true,
        bannerSubtitle: true,
        bannerDiscount: true,
        whatsapp: true,
        instagram: true,
        facebook: true,
        twitter: true,
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