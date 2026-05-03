const prisma = require("../config/db");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const reservedWords = [
  "login", "register", "dashboard", "api", "admin", "pricing",
  "faq", "support", "checkout", "cart", "settings", "shop",
  "store", "forgot-password", "verify-email",
];

// UPDATED: Added a folder parameter so logos and banners don't mix with products
const uploadToCloudinary = (buffer, folderName = "sabisell_products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderName }, 
      (error, result) => {
        if (result) {
          resolve(result.secure_url); 
        } else {
          reject(error);
        }
      }
    );
    stream.end(buffer);
  });
};

// @route   GET /api/vendors/check-link?slug=xyz
exports.checkStoreLink = async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ available: false, message: "Store link is required" });
    }

    const formattedSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    if (reservedWords.includes(formattedSlug)) {
      return res.json({ available: false, message: "This name is reserved by the system." });
    }

    const existingStore = await prisma.vendor.findFirst({
      where: { storeLink: formattedSlug },
    });

    if (existingStore) {
      return res.json({ available: false, message: "This link is already taken." });
    }

    return res.json({ available: true, formattedSlug });
  } catch (error) {
    console.error("Link Check Error:", error);
    res.status(500).json({ available: false, message: "Error checking link availability." });
  }
};

// @route   PUT /api/vendors/onboarding
exports.completeOnboarding = async (req, res) => {
  try {
    const vendorId = req.vendor.id; 
    const { storeName, storeCategory, storeDescription, storeLink } = req.body;

    if (!storeLink) {
      return res.status(400).json({ message: "Store link is required." });
    }
    const finalStoreLink = storeLink
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    if (reservedWords.includes(finalStoreLink)) {
      return res.status(400).json({ message: "This store name is reserved." });
    }

    const existingStore = await prisma.vendor.findFirst({
      where: { storeLink: finalStoreLink },
    });

    if (existingStore && existingStore.id !== vendorId) {
      return res.status(400).json({ message: "This store link is already taken." });
    }

    let logoUrl = null;
    if (req.file && req.file.buffer) {
      logoUrl = await uploadToCloudinary(req.file.buffer, "sabisell_logos"); 
    }

    const updatedVendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        storeName,
        storeCategory,
        storeDescription,
        storeLink: finalStoreLink,
        isOnline: true,
        ...(logoUrl && { logoUrl: logoUrl }),
      },
    });

    res.status(200).json({
      message: "Store setup complete!",
      store: {
        storeName: updatedVendor.storeName,
        storeLink: updatedVendor.storeLink,
        logoUrl: updatedVendor.logoUrl,
      },
    });
  } catch (error) {
    console.error("Onboarding Error:", error);
    res.status(500).json({ message: "Server error during onboarding." });
  }
};

// @route   GET /api/vendors/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    const totalProducts = await prisma.product.count({ where: { vendorId } });
    const totalOrders = await prisma.order.count({ where: { vendorId } });

    const revenueResult = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { vendorId, paymentStatus: "PAID" },
    });
    const totalRevenue = revenueResult._sum.totalAmount || 0;

    const recentOrders = await prisma.order.findMany({
      where: { vendorId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { customer: { select: { fullName: true } } },
    });

    res.status(200).json({
      stats: { totalRevenue, totalOrders, totalProducts },
      recentOrders,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Server error while fetching dashboard stats." });
  }
};

// --- NEW CONTROLLERS FOR SETTINGS ---

// @route   GET /api/vendors/profile
// @desc    Get full vendor profile for the settings page
exports.getVendorProfile = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Don't send sensitive data like password back to frontend
    delete vendor.passwordHash; // Note: Ensure this matches your schema (passwordHash)
    
    res.status(200).json({ vendor });
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    res.status(500).json({ message: "Failed to load store settings." });
  }
};

// @route   PUT /api/vendors/settings
// @desc    Update store settings, including dual image upload
exports.updateVendorSettings = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    // 1. Extract text fields from req.body (FormData sends everything as strings)
    let {
      storeName, storeCategory, storeDescription, storeLink,
      phone, whatsapp, email, instagram, facebook, twitter, tiktok, snapchat,
      themeColor, hasBanner, bannerTitle, bannerSubtitle, bannerDiscount,
      enableSlideshow, // NEW
      enableSecondaryBanner, secondaryBannerTitle, secondaryBannerDesc, // NEW
      businessName, cacNumber, businessAddress, showBusinessDetails,
      bankName, accountNumber, accountName, deliveryFee, deliveryTime,
      isOnline
    } = req.body;

    if (email) {
      email = email.toLowerCase();
    }

    // 2. Format and check the custom store link
    const finalStoreLink = storeLink
      ? storeLink.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
      : undefined;

    if (finalStoreLink) {
      if (reservedWords.includes(finalStoreLink)) {
        return res.status(400).json({ message: "This store link is reserved." });
      }
      const existingStore = await prisma.vendor.findFirst({
        where: { storeLink: finalStoreLink },
      });
      if (existingStore && existingStore.id !== vendorId) {
        return res.status(400).json({ message: "This store link is already taken." });
      }
    }

    // 3. Convert stringified Booleans and Numbers from FormData back to correct types
    const parsedHasBanner = hasBanner === 'true';
    const parsedEnableSlideshow = enableSlideshow === 'true'; // NEW
    const parsedEnableSecondaryBanner = enableSecondaryBanner === 'true'; // NEW
    const parsedShowBusinessDetails = showBusinessDetails === 'true';
    const parsedIsOnline = isOnline === 'true';
    const parsedDeliveryFee = deliveryFee ? parseFloat(deliveryFee) : null;

    // Fetch existing vendor to safely merge slideshow arrays
    const existingVendor = await prisma.vendor.findUnique({ where: { id: vendorId } });
    let currentSlides = existingVendor.slideshowImages || [];

    // 4. Handle Cloudinary Uploads for arrays (upload.fields)
    let newLogoUrl = undefined;
    let newBannerUrl = undefined;
    let newSecondaryBannerUrl = undefined;

    if (req.files) {
      // Existing single images
      if (req.files.logo && req.files.logo.length > 0) {
        newLogoUrl = await uploadToCloudinary(req.files.logo[0].buffer, "sabisell_logos");
      }
      if (req.files.bannerImage && req.files.bannerImage.length > 0) {
        newBannerUrl = await uploadToCloudinary(req.files.bannerImage[0].buffer, "sabisell_banners");
      }
      
      // NEW: Secondary Banner
      if (req.files.secondaryBannerImage && req.files.secondaryBannerImage.length > 0) {
        newSecondaryBannerUrl = await uploadToCloudinary(req.files.secondaryBannerImage[0].buffer, "sabisell_banners");
      }

      // NEW: Slideshow Images
      if (req.files.slide1 && req.files.slide1.length > 0) {
        currentSlides[0] = await uploadToCloudinary(req.files.slide1[0].buffer, "sabisell_banners");
      }
      if (req.files.slide2 && req.files.slide2.length > 0) {
        currentSlides[1] = await uploadToCloudinary(req.files.slide2[0].buffer, "sabisell_banners");
      }
      if (req.files.slide3 && req.files.slide3.length > 0) {
        currentSlides[2] = await uploadToCloudinary(req.files.slide3[0].buffer, "sabisell_banners");
      }
    }

    // Clean array (remove nulls if slides were skipped)
    const finalSlideshowImages = currentSlides.filter(Boolean);

    // 5. Build update object
    const updateData = {
      storeName,
      storeCategory,
      storeDescription,
      ...(finalStoreLink && { storeLink: finalStoreLink }),
      phone,
      whatsapp,
      email,
      instagram,
      facebook,
      twitter,
      tiktok,
      snapchat,
      themeColor,
      hasBanner: parsedHasBanner,
      bannerTitle,
      bannerSubtitle,
      bannerDiscount,
      enableSlideshow: parsedEnableSlideshow, // NEW
      slideshowImages: finalSlideshowImages, // NEW
      enableSecondaryBanner: parsedEnableSecondaryBanner, // NEW
      secondaryBannerTitle, // NEW
      secondaryBannerDesc, // NEW
      businessName,
      cacNumber,
      businessAddress,
      showBusinessDetails: parsedShowBusinessDetails,
      bankName,
      accountNumber,
      accountName,
      deliveryFee: parsedDeliveryFee,
      deliveryTime,
      isOnline: parsedIsOnline,
    };

    if (newLogoUrl) updateData.logoUrl = newLogoUrl;
    if (newBannerUrl) updateData.bannerImage = newBannerUrl;
    if (newSecondaryBannerUrl) updateData.secondaryBannerImage = newSecondaryBannerUrl;

    // 6. Update database
    const updatedVendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: updateData,
    });

    // Remove password hash before sending back to frontend
    delete updatedVendor.passwordHash;

    res.status(200).json({
      message: "Settings updated successfully",
      vendor: updatedVendor
    });

  } catch (error) {
    console.error("Update Settings Error:", error);
    res.status(500).json({ message: "Failed to update store settings." });
  }
};