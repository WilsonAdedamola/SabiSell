// const express = require('express');
// const router = express.Router();
// const vendorController = require('../controllers/vendor.controller');
// const { protect } = require('../middlewares/auth.middleware');
// const upload = require('../middlewares/upload.middleware');

// // How we stack the middlewares:
// // 1. "protect": Make sure they are logged in.
// // 2. "upload.single('logo')": Grab the uploaded image file.
// // 3. "completeOnboarding": Run the logic.
// router.put('/onboarding', protect, upload.single('logo'), vendorController.completeOnboarding);
// router.get('/dashboard', protect, vendorController.getDashboardStats);
// router.get('/check-link', protect, vendorController.checkStoreLink);


// module.exports = router;


const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor.controller');
const { protect } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// --- 1. ONBOARDING ---
// Still uses single upload for the initial logo
router.put('/onboarding', protect, upload.single('logo'), vendorController.completeOnboarding);

// --- 2. DASHBOARD & UTILS ---
router.get('/dashboard', protect, vendorController.getDashboardStats);
router.get('/check-link', protect, vendorController.checkStoreLink);
router.get('/profile', protect, vendorController.getVendorProfile); 
router.get('/banks', protect, vendorController.getBanks); 
router.get('/verify-account', protect, vendorController.verifyBankAccount);

// --- 3. SETTINGS UPGRADE ---
/**
 * Using upload.fields allows us to handle multiple specific file fields.
 * This matches the 'logo' and 'bannerImage' keys we used in the Frontend FormData.
 */
router.put(
  '/settings', 
  protect, 
  upload.fields([
    { name: 'logo', maxCount: 1 }, 
    { name: 'bannerImage', maxCount: 1 },
    { name: 'slide1', maxCount: 1 },
  { name: 'slide2', maxCount: 1 },
  { name: 'slide3', maxCount: 1 },
  { name: 'secondaryBannerImage', maxCount: 1 }
  ]), 
  vendorController.updateVendorSettings
);

module.exports = router;