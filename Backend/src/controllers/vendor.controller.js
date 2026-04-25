// const prisma = require('../config/db');
// // const cloudinary = require('../config/cloudinary');
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const reservedWords = [
//   "login", "register", "dashboard", "api", "admin", "pricing",
//   "faq", "support", "checkout", "cart", "settings", "shop", "store",
//   "forgot-password", "verify-email"
// ];

// const uploadToCloudinary = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: "sabisell_products" }, // Keeps Cloudinary dashboard neat
//       (error, result) => {
//         if (result) {
//           resolve(result.secure_url); // Returns the actual HTTP link
//         } else {
//           reject(error);
//         }
//       }
//     );
//     stream.end(buffer);
//   });
// };

// // @route   PUT /api/vendors/onboarding
// // @desc    Complete store setup and add logo
// exports.completeOnboarding = async (req, res) => {
//   try {
//     const vendorId = req.vendor.id; // From protect middleware
//     const { storeName, storeType, storeDescription } = req.body;

//     // 1. Extract the Cloudinary URL for the single logo file
//     let logoUrl = null;
//     if (req.file && req.file.buffer) {
//       logoUrl = await uploadToCloudinary(req.file.buffer); // This is the live Cloudinary link
//     }

//     // Optional: Generate a simple store link (e.g., "Zara Stitches" -> "zara-stitches")
//     const storeLink = storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

//     // 2. Update the Vendor record
//     const updatedVendor = await prisma.vendor.update({
//       where: { id: vendorId },
//       data: {
//         storeName,
//         storeType,
//         storeDescription,
//         storeLink,
//         isOnline: true,
//         // Only update the logoUrl in the DB if a new file was actually uploaded
//         ...(logoUrl && { logoUrl: logoUrl })
//       }
//     });

//     res.status(200).json({
//       message: "Store setup complete!",
//       store: {
//         storeName: updatedVendor.storeName,
//         storeLink: updatedVendor.storeLink,
//         logoUrl: updatedVendor.logoUrl
//       }
//     });

//   } catch (error) {
//     console.error("Onboarding Error:", error);
//     res.status(500).json({ message: "Server error during onboarding." });
//   }
// };

// // @route   GET /api/vendors/dashboard
// // @desc    Get stats for the vendor dashboard (Revenue, Orders, Products)
// exports.getDashboardStats = async (req, res) => {
//   try {
//     const vendorId = req.vendor.id;

//     // 1. Get Total Products
//     const totalProducts = await prisma.product.count({
//       where: { vendorId }
//     });

//     // 2. Get Total Orders
//     const totalOrders = await prisma.order.count({
//       where: { vendorId }
//     });

//     // 3. Calculate Total Revenue (Only sum up PAID or DELIVERED orders)
//     const revenueResult = await prisma.order.aggregate({
//       _sum: { totalAmount: true },
//       where: {
//         vendorId,
//         paymentStatus: "PAID"
//       }
//     });
//     const totalRevenue = revenueResult._sum.totalAmount || 0;

//     // 4. Get the 5 most recent orders for the recent activity table
//     const recentOrders = await prisma.order.findMany({
//       where: { vendorId },
//       orderBy: { createdAt: 'desc' },
//       take: 5,
//       include: {
//         customer: { select: { fullName: true } }
//       }
//     });

//     res.status(200).json({
//       stats: {
//         totalRevenue,
//         totalOrders,
//         totalProducts
//       },
//       recentOrders
//     });

//   } catch (error) {
//     console.error("Dashboard Stats Error:", error);
//     res.status(500).json({ message: "Server error while fetching dashboard stats." });
//   }
// };

const prisma = require("../config/db");
// const cloudinary = require('../config/cloudinary');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const reservedWords = [
  "login",
  "register",
  "dashboard",
  "api",
  "admin",
  "pricing",
  "faq",
  "support",
  "checkout",
  "cart",
  "settings",
  "shop",
  "store",
  "forgot-password",
  "verify-email",
];

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "sabisell_products" }, // Keeps Cloudinary dashboard neat
      (error, result) => {
        if (result) {
          resolve(result.secure_url); // Returns the actual HTTP link
        } else {
          reject(error);
        }
      },
    );
    stream.end(buffer);
  });
};

// handle the live "on-keypress" check
// @route   GET /api/vendors/check-link?slug=xyz
exports.checkStoreLink = async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res
        .status(400)
        .json({ available: false, message: "Store link is required" });
    }

    // Force lowercase and replace spaces/special chars with hyphens
    const formattedSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    // Check A: Reserved Words
    if (reservedWords.includes(formattedSlug)) {
      return res.json({
        available: false,
        message: "This name is reserved by the system.",
      });
    }

    // Check B: Database availability
    const existingStore = await prisma.vendor.findFirst({
      where: { storeLink: formattedSlug },
    });

    if (existingStore) {
      return res.json({
        available: false,
        message: "This link is already taken.",
      });
    }

    return res.json({ available: true, formattedSlug });
  } catch (error) {
    console.error("Link Check Error:", error);
    res
      .status(500)
      .json({ available: false, message: "Error checking link availability." });
  }
};

// @route   PUT /api/vendors/onboarding
// @desc    Complete store setup and add logo
exports.completeOnboarding = async (req, res) => {
  try {
    const vendorId = req.vendor.id; // From protect middleware
    const { storeName, storeType, storeDescription, storeLink } = req.body;

    if (!storeLink) {
      return res.status(400).json({ message: "Store link is required." });
    }
    const finalStoreLink = storeLink
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    // SECURITY & COLLISION CHECKS

    if (reservedWords.includes(finalStoreLink)) {
      return res.status(400).json({ message: "This store name is reserved." });
    }

    const existingStore = await prisma.vendor.findFirst({
      where: { storeLink: finalStoreLink },
    });

    if (existingStore && existingStore.id !== vendorId) {
      return res
        .status(400)
        .json({ message: "This store link is already taken." });
    }

    // 2. Extract the Cloudinary URL for the single logo file
    let logoUrl = null;
    if (req.file && req.file.buffer) {
      logoUrl = await uploadToCloudinary(req.file.buffer); // This is the live Cloudinary link
    }

    // 3. Update the Vendor record
    const updatedVendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        storeName,
        storeType,
        storeDescription,
        storeLink: finalStoreLink,
        isOnline: true,
        // Only update the logoUrl in the DB if a new file was actually uploaded
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
// @desc    Get stats for the vendor dashboard (Revenue, Orders, Products)
exports.getDashboardStats = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    // 1. Get Total Products
    const totalProducts = await prisma.product.count({
      where: { vendorId },
    });

    // 2. Get Total Orders
    const totalOrders = await prisma.order.count({
      where: { vendorId },
    });

    // 3. Calculate Total Revenue (Only sum up PAID or DELIVERED orders)
    const revenueResult = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: {
        vendorId,
        paymentStatus: "PAID",
      },
    });
    const totalRevenue = revenueResult._sum.totalAmount || 0;

    // 4. Get the 5 most recent orders for the recent activity table
    const recentOrders = await prisma.order.findMany({
      where: { vendorId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        customer: { select: { fullName: true } },
      },
    });

    res.status(200).json({
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching dashboard stats." });
  }
};
