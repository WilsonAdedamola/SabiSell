const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { protect } = require('../middlewares/auth.middleware');

router.put('/upgrade', protect, subscriptionController.upgradePlan);

module.exports = router;