const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const { enforceProductLimit } = require('../middlewares/checkPlan.middleware');

// POST: Add a new product (allows up to 5 images)
router.post('/', protect, enforceProductLimit, upload.array('images', 5), productController.createProduct);

// GET: Fetch all products for the dashboard
router.get('/', protect, productController.getVendorProducts);

// GET: Fetch a single product by ID
router.get('/:id', protect, productController.getProductById);

// PUT: Update an existing product (Notice we use upload.array to handle new images)
router.put('/:id', protect, upload.array('images', 5), productController.updateProduct);

// DELETE: Remove a specific product by ID
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;

module.exports = router;