const express = require('express');
const router = express.Router();
const { paystackWebhook } = require('../controllers/webhook.controller');

// The route will be POST /api/webhooks/paystack
router.post('/paystack', paystackWebhook);

module.exports = router;