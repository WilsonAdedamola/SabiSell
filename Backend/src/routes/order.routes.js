const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { protect } = require('../middlewares/auth.middleware');

// GET: Fetch all orders
router.get('/', protect, orderController.getVendorOrders);

// POST: Generate a dummy order (Testing only)
router.post('/dummy', protect, orderController.createDummyOrder);

// PUT: Update order status (Requires the order ID in the URL)
router.put('/:id/status', protect, orderController.updateOrderStatus);

module.exports = router;