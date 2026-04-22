const prisma = require('../config/db');
// const cloudinary = require('../config/cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
      }
    );
    stream.end(buffer);
  });
};

// @route   PUT /api/vendors/onboarding
// @desc    Complete store setup and add logo
exports.completeOnboarding = async (req, res) => {
  try {
    const vendorId = req.vendor.id; // From protect middleware
    const { storeName, storeType, storeDescription } = req.body;

    // 1. Extract the Cloudinary URL for the single logo file
    let logoUrl = null;
    if (req.file && req.file.buffer) {
      logoUrl = await uploadToCloudinary(req.file.buffer); // This is the live Cloudinary link
    }

    // Optional: Generate a simple store link (e.g., "Zara Stitches" -> "zara-stitches")
    const storeLink = storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // 2. Update the Vendor record
    const updatedVendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        storeName,
        storeType,
        storeDescription,
        storeLink,
        isOnline: true,
        // Only update the logoUrl in the DB if a new file was actually uploaded
        ...(logoUrl && { logoUrl: logoUrl }) 
      }
    });

    res.status(200).json({
      message: "Store setup complete!",
      store: {
        storeName: updatedVendor.storeName,
        storeLink: updatedVendor.storeLink,
        logoUrl: updatedVendor.logoUrl
      }
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
      where: { vendorId }
    });

    // 2. Get Total Orders
    const totalOrders = await prisma.order.count({
      where: { vendorId }
    });

    // 3. Calculate Total Revenue (Only sum up PAID or DELIVERED orders)
    const revenueResult = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { 
        vendorId,
        paymentStatus: "PAID" 
      }
    });
    const totalRevenue = revenueResult._sum.totalAmount || 0;

    // 4. Get the 5 most recent orders for the recent activity table
    const recentOrders = await prisma.order.findMany({
      where: { vendorId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        customer: { select: { fullName: true } }
      }
    });

    res.status(200).json({
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts
      },
      recentOrders
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Server error while fetching dashboard stats." });
  }
};