const prisma = require('../config/db');

// Middleware to enforce product limits based on the vendor's subscription tier
const enforceProductLimit = async (req, res, next) => {
  try {
    const vendorId = req.vendor.id;

    // 1. Get the vendor's current plan
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { plan: true }
    });

    // 2. Count how many products they already have
    const productCount = await prisma.product.count({
      where: { vendorId }
    });

    // 3. Define the limits for each tier
    const limits = {
      FREE: 10,
      STARTER: 100,
      GROWTH: Infinity // Unlimited!
    };

    const maxProducts = limits[vendor.plan] || 10; // Default to 10 just in case

    // 4. Block them if they hit the limit
    if (productCount >= maxProducts) {
      return res.status(403).json({ 
        success: false,
        message: `Plan Limit Reached! You have ${productCount} products. The ${vendor.plan} plan allows a maximum of ${maxProducts}. Please upgrade to add more.` 
      });
    }

    // 5. If they are under the limit, let them proceed!
    next();

  } catch (error) {
    console.error("Plan Check Error:", error);
    res.status(500).json({ message: "Server error while verifying subscription limits." });
  }
};

module.exports = { enforceProductLimit };