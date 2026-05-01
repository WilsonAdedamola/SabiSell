const prisma = require("../config/db");

// @route   GET /api/categories
// @desc    Get all categories for the logged-in vendor
exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { vendorId: req.vendor.id },
      orderBy: { createdAt: 'asc' }
    });
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Fetch Categories Error:", error);
    res.status(500).json({ message: "Failed to load categories." });
  }
};

// @route   POST /api/categories
// @desc    Create a new category (Enforces plan limits)
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const vendorId = req.vendor.id;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required." });
    }

    // 1. Get vendor's plan and current category count
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      include: {
        _count: { select: { categories: true } }
      }
    });

    const currentPlan = vendor.plan || "FREE";
    const currentCount = vendor._count.categories;
    
    // 2. Enforce limits
    const limit = currentPlan === "FREE" ? 0 : currentPlan === "STARTER" ? 5 : 15;

    if (currentCount >= limit) {
      return res.status(403).json({ 
        message: `Limit reached. Your ${currentPlan} plan allows a maximum of ${limit} categories.` 
      });
    }

    // 3. Check for duplicates
    const existingCategory = await prisma.category.findFirst({
      where: { 
        vendorId, 
        name: { equals: name.trim(), mode: 'insensitive' } 
      }
    });

    if (existingCategory) {
      return res.status(400).json({ message: "A category with this name already exists." });
    }

    // 4. Create Category
    const newCategory = await prisma.category.create({
      data: {
        name: name.trim(),
        vendorId
      }
    });

    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Failed to create category." });
  }
};

// @route   PUT /api/categories/:id
// @desc    Update a category name
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const vendorId = req.vendor.id;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required." });
    }

    // Ensure category belongs to vendor
    const existingCategory = await prisma.category.findUnique({ where: { id } });
    if (!existingCategory || existingCategory.vendorId !== vendorId) {
      return res.status(404).json({ message: "Category not found." });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name: name.trim() }
    });

    // NOTE: Because your Product model stores category as a String name (not an ID),
    // we also need to update all products that used the old category name.
    await prisma.product.updateMany({
      where: { vendorId, category: existingCategory.name },
      data: { category: name.trim() }
    });

    res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ message: "Failed to update category." });
  }
};

// @route   DELETE /api/categories/:id
// @desc    Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const vendorId = req.vendor.id;

    const existingCategory = await prisma.category.findUnique({ where: { id } });
    if (!existingCategory || existingCategory.vendorId !== vendorId) {
      return res.status(404).json({ message: "Category not found." });
    }

    await prisma.category.delete({ where: { id } });

    // Optional: Clear the category string from products that used it
    await prisma.product.updateMany({
      where: { vendorId, category: existingCategory.name },
      data: { category: "Uncategorized" } // Or leave as "" depending on preference
    });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ message: "Failed to delete category." });
  }
};