const prisma = require('../config/db');

// @route   PUT /api/subscription/upgrade
// @desc    Upgrade vendor's subscription plan
exports.upgradePlan = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { newPlan } = req.body; // e.g., "STARTER" or "GROWTH"

    // Validate the input
    if (!["FREE", "STARTER", "GROWTH"].includes(newPlan)) {
      return res.status(400).json({ message: "Invalid subscription plan selected." });
    }

    // Update the vendor
    const updatedVendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: { plan: newPlan }
    });

    res.status(200).json({
      message: `Successfully upgraded to the ${newPlan} plan! 🚀`,
      plan: updatedVendor.plan
    });

  } catch (error) {
    console.error("Upgrade Error:", error);
    res.status(500).json({ message: "Server error while upgrading plan." });
  }
};