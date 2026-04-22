const prisma = require('../config/db');
// const cloudinary = require('../config/cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "sabisell_products" }, // Keeps Cloudinary dashboard neat
      (error, result) => {
        if (result) {
          resolve(result.secure_url); // Returns the actual HTTP link
        } else {
          reject(error);
        }
      }
    );
    stream.end(buffer);
  });
};

// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    
    const { name, category, description, price, compareAtPrice, stockQuantity, status } = req.body;

    // 1. Upload buffers to Cloudinary using Promise.all (super fast, parallel uploads)
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      imageUrls = await Promise.all(uploadPromises); 
    }

    // 2. Save to database (Now imageUrls contains real links!)
    const newProduct = await prisma.product.create({
      data: {
        vendorId,
        name,
        category,
        description,
        price: parseFloat(price || 0),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        stockQuantity: parseInt(stockQuantity || 0),
        status: status || "DRAFT",
        imageUrls: imageUrls 
      }
    });

    res.status(201).json({ message: "Product created successfully!", product: newProduct });

  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error while creating product." });
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

// @route   DELETE /api/products/:id
// @desc    Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const vendorId = req.vendor.id; // From our protect middleware
    const { id } = req.params; // The product ID from the URL

    // 1. Verify the product exists AND belongs to this specific vendor
    const product = await prisma.product.findFirst({
      where: { 
        id: id,
        vendorId: vendorId 
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found or you are not authorized to delete it." });
    }

    // 2. Delete the product from the database
    await prisma.product.delete({
      where: { id: id }
    });

    res.status(200).json({ message: "Product deleted successfully!" });

  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error while deleting product." });
  }
};

// @route   GET /api/products/:id
// @desc    Get a single product by ID for editing
exports.getProductById = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: { 
        id: id,
        vendorId: vendorId // Ensure they can only fetch their own products!
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({ message: "Server error while fetching product." });
  }
};

// @route   PUT /api/products/:id
// @desc    Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { id } = req.params;
    
    // Extract everything sent from the React FormData
    const { 
      name, 
      category, 
      description, 
      price, 
      compareAtPrice, 
      stockQuantity, 
      status, 
      existingImages 
    } = req.body;

    // 1. Verify the product exists and belongs to the vendor
    const existingProduct = await prisma.product.findFirst({
      where: { id: id, vendorId: vendorId }
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found or unauthorized." });
    }

    // 2. Handle Images (Combine kept images with newly uploaded ones)
    let finalImageUrls = [];
    
    // Parse the existing images the user decided to keep
    if (existingImages) {
      finalImageUrls = JSON.parse(existingImages);
    }

    // Add any newly uploaded images from Cloudinary/Multer
    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map(file => file.path);
      finalImageUrls = [...finalImageUrls, ...newImageUrls];
    }

    // Enforce the 5 image limit on the backend just to be safe
    if (finalImageUrls.length > 5) {
      return res.status(400).json({ message: "A product cannot have more than 5 images." });
    }

    // 3. Update the database
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name,
        category,
        description,
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        stockQuantity: parseInt(stockQuantity),
        status,
        imageUrls: finalImageUrls
      }
    });

    res.status(200).json({ 
      message: "Product updated successfully!", 
      product: updatedProduct 
    });

  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error while updating product." });
  }
};