const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const { protect } = require('../middlewares/auth.middleware');

// GET /api/analytics
router.get('/', protect, analyticsController.getAnalytics);

module.exports = router;