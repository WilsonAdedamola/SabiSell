const prisma = require('../config/db');
const cloudinary = require('../config/cloudinary');

// @route   POST /api/products
// @desc    Create a new product with images
exports.createProduct = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { name, description, price, compareAtPrice, stockQuantity, category, status } = req.body;

    // 1. Upload all images to Cloudinary
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      // Loop through each uploaded file
      for (const file of req.files) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = "data:" + file.mimetype + ";base64," + b64;
        
        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
          folder: `sabisell/products/${vendorId}` // Organizes images by vendor
        });
        
        imageUrls.push(uploadResponse.secure_url);
      }
    }

    // 2. Save the product to the Database
    const newProduct = await prisma.product.create({
      data: {
        vendorId,
        name,
        description,
        price: parseFloat(price), // Ensure it's a decimal/number
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        stockQuantity: parseInt(stockQuantity) || 0,
        category,
        status: status || "ACTIVE",
        imageUrls
      }
    });

    res.status(201).json({
      message: "Product added successfully!",
      product: newProduct
    });

  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error while adding product." });
  }
};

// @route   GET /api/products
// @desc    Get all products for the logged-in vendor
exports.getVendorProducts = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    const products = await prisma.product.findMany({
      where: { vendorId },
      orderBy: { createdAt: 'desc' } // Newest products first
    });

    res.status(200).json({
      count: products.length,
      products
    });

  } catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).json({ message: "Server error while fetching products." });
  }
};