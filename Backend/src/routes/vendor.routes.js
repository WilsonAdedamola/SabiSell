const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor.controller');
const { protect } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// How we stack the middlewares:
// 1. "protect": Make sure they are logged in.
// 2. "upload.single('logo')": Grab the uploaded image file.
// 3. "completeOnboarding": Run the logic.
router.put('/onboarding', protect, upload.single('logo'), vendorController.completeOnboarding);
router.get('/dashboard', protect, vendorController.getDashboardStats);
router.get('/check-link', protect, vendorController.checkStoreLink);


module.exports = router;