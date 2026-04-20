const express = require('express');
const router = express.Router();
const storefrontController = require('../controllers/storefront.controller');

// There is NO "protect" middleware here. Anyone can access these

// 1. Get Store Info (e.g., /api/storefront/zara-fashion)
router.get('/:storeLink', storefrontController.getStoreDetails);

// 2. Get Store Products (e.g., /api/storefront/zara-fashion/products)
router.get('/:storeLink/products', storefrontController.getStoreProducts);

// 3. Get Single Product (e.g., /api/storefront/product/12345-abcde)
router.get('/product/:productId', storefrontController.getProductDetails);

module.exports = router;