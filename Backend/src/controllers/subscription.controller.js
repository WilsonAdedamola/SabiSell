const prisma = require('../config/db');
const axios = require('axios');

// @route   PUT /api/subscription/upgrade
// @desc    Upgrade vendor's subscription plan and sync with Paystack
exports.upgradePlan = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { newPlan } = req.body; // e.g., "STARTER" or "GROWTH"

    // 1. Validate the input
    const validPlans = ["FREE", "STARTER", "GROWTH"];
    if (!validPlans.includes(newPlan)) {
      return res.status(400).json({ message: "Invalid subscription plan selected." });
    }

    // 2. Determine the new SabiSell Platform Fee
    let newPlatformFee = 3.0; // Default FREE
    if (newPlan === "STARTER") newPlatformFee = 1.5;
    if (newPlan === "GROWTH") newPlatformFee = 0;

    // 3. Fetch the vendor to get their Subaccount Code
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId }
    });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    // 4. Sync the new fee with Paystack (If they have set up payments)
    // if (vendor.paystackSubaccountCode) {
    //   try {
    //     await axios.put(
    //       `https://api.paystack.co/subaccount/${vendor.paystackSubaccountCode}`,
    //       {
    //         percentage_charge: newPlatformFee
    //       },
    //       {
    //         headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    //       }
    //     );
    //     console.log(`✅ Paystack Subaccount synced. New fee: ${newPlatformFee}%`);
    //   } catch (paystackError) {
    //     console.error("🚨 Paystack Sync Error:", paystackError.response?.data || paystackError.message);
    //     // Abort the upgrade if Paystack fails, so the DB and Paystack stay perfectly in sync
    //     return res.status(502).json({ 
    //       message: "Failed to sync new fees with the payment gateway. Plan upgrade aborted." 
    //     });
    //   }
    // }

    // 5. Update the Database with the new plan
    const updatedVendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: { plan: newPlan }
    });

    // 6. Log a system notification for the vendor
    await prisma.notification.create({
      data: {
        vendorId: vendorId,
        type: "system",
        title: "Plan Upgraded 🚀",
        message: `You are now on the ${newPlan} plan. Your platform transaction fees are now ${newPlatformFee}%.`,
        link: "/dashboard/payments",
      }
    });

    res.status(200).json({
      success: true,
      message: `Successfully upgraded to the ${newPlan} plan 🚀`,
      plan: updatedVendor.plan
    });

  } catch (error) {
    console.error("Upgrade Error:", error);
    res.status(500).json({ message: "Server error while upgrading plan." });
  }
};