const prisma = require('../config/db');
const cloudinary = require('../config/cloudinary');

// @route   PUT /api/vendors/onboarding
// @desc    Complete store setup (Name, Type, Description, Logo)
exports.completeOnboarding = async (req, res) => {
  try {
    const vendorId = req.vendor.id; // Comes from our auth middleware
    const { storeName, storeType, storeDescription } = req.body;

    let logoUrl = null;

    // 1. If the user uploaded a logo, send it to Cloudinary
    if (req.file) {
      // Convert the memory buffer into a format Cloudinary can read
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      
      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: "sabisell/logos"
      });
      
      logoUrl = uploadResponse.secure_url;
    }

    // 2. Generate a clean, unique Store Link (e.g., "Zara Fashion" -> "zara-fashion")
    let storeLink = null;
    if (storeName) {
      storeLink = storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      // Safety check: Make sure no other vendor already took this exact link
      const existingLink = await prisma.vendor.findUnique({ where: { storeLink } });
      if (existingLink && existingLink.id !== vendorId) {
        storeLink = `${storeLink}-${Math.floor(Math.random() * 10000)}`; // Append random number if taken
      }
    }

    // 3. Update the Vendor in the Database
    const updatedVendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        storeName,
        storeType,
        storeDescription,
        ...(logoUrl && { logoUrl }), // Only update logo if one was uploaded
        ...(storeLink && { storeLink }),
        isOnline: true // Store is now active!
      }
    });

    res.status(200).json({
      message: "Store setup completed successfully!",
      store: {
        storeName: updatedVendor.storeName,
        storeLink: updatedVendor.storeLink,
        storeType: updatedVendor.storeType,
        storeDescription: updatedVendor.storeDescription,
        logoUrl: updatedVendor.logoUrl,
        isOnline: updatedVendor.isOnline
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