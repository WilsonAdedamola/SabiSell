const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { protect } = require('../middlewares/auth.middleware'); // Adjust path if needed

// All category routes require the vendor to be logged in
router.use(protect);

router.route('/')
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);

router.route('/:id')
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;