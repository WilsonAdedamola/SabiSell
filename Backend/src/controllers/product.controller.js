// const prisma = require('../config/db');
// // const cloudinary = require('../config/cloudinary');
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadToCloudinary = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: "sabisell_products" }, // Keeps Cloudinary dashboard neat
//       (error, result) => {
//         if (result) {
//           resolve(result.secure_url); // Returns the actual HTTP link
//         } else {
//           reject(error);
//         }
//       }
//     );
//     stream.end(buffer);
//   });
// };

// // @route   POST /api/products
// exports.createProduct = async (req, res) => {
//   try {
//     const vendorId = req.vendor.id;
    
//     const { name, category, description, price, compareAtPrice, stockQuantity, status } = req.body;

//     // 1. Upload buffers to Cloudinary using Promise.all (super fast, parallel uploads)
//     let imageUrls = [];
//     if (req.files && req.files.length > 0) {
//       const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
//       imageUrls = await Promise.all(uploadPromises); 
//     }

//     // 2. Save to database (Now imageUrls contains real links!)
//     const newProduct = await prisma.product.create({
//       data: {
//         vendorId,
//         name,
//         category,
//         description,
//         price: parseFloat(price || 0),
//         compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
//         stockQuantity: parseInt(stockQuantity || 0),
//         status: status || "DRAFT",
//         imageUrls: imageUrls 
//       }
//     });

//     res.status(201).json({ message: "Product created successfully!", product: newProduct });

//   } catch (error) {
//     console.error("Create Product Error:", error);
//     res.status(500).json({ message: "Server error while creating product." });
//   }
// };

// // @route   GET /api/products
// // @desc    Get all products for the logged-in vendor
// exports.getVendorProducts = async (req, res) => {
//   try {
//     const vendorId = req.vendor.id;

//     const products = await prisma.product.findMany({
//       where: { vendorId },
//       orderBy: { createdAt: 'desc' } // Newest products first
//     });

//     res.status(200).json({
//       count: products.length,
//       products
//     });

//   } catch (error) {
//     console.error("Fetch Products Error:", error);
//     res.status(500).json({ message: "Server error while fetching products." });
//   }
// };

// // @route   DELETE /api/products/:id
// // @desc    Delete a product
// exports.deleteProduct = async (req, res) => {
//   try {
//     const vendorId = req.vendor.id; // From our protect middleware
//     const { id } = req.params; // The product ID from the URL

//     // 1. Verify the product exists AND belongs to this specific vendor
//     const product = await prisma.product.findFirst({
//       where: { 
//         id: id,
//         vendorId: vendorId 
//       }
//     });

//     if (!product) {
//       return res.status(404).json({ message: "Product not found or you are not authorized to delete it." });
//     }

//     // 2. Delete the product from the database
//     await prisma.product.delete({
//       where: { id: id }
//     });

//     res.status(200).json({ message: "Product deleted successfully!" });

//   } catch (error) {
//     console.error("Delete Product Error:", error);
//     res.status(500).json({ message: "Server error while deleting product." });
//   }
// };

// // @route   GET /api/products/:id
// // @desc    Get a single product by ID for editing
// exports.getProductById = async (req, res) => {
//   try {
//     const vendorId = req.vendor.id;
//     const { id } = req.params;

//     const product = await prisma.product.findFirst({
//       where: { 
//         id: id,
//         vendorId: vendorId // Ensure they can only fetch their own products!
//       }
//     });

//     if (!product) {
//       return res.status(404).json({ message: "Product not found." });
//     }

//     res.status(200).json({ product });
//   } catch (error) {
//     console.error("Get Product Error:", error);
//     res.status(500).json({ message: "Server error while fetching product." });
//   }
// };

// // @route   PUT /api/products/:id
// // @desc    Update an existing product
// exports.updateProduct = async (req, res) => {
//   try {
//     const vendorId = req.vendor.id;
//     const { id } = req.params;
    
//     // Extract everything sent from the React FormData
//     const { 
//       name, 
//       category, 
//       description, 
//       price, 
//       compareAtPrice, 
//       stockQuantity, 
//       status, 
//       existingImages 
//     } = req.body;

//     // 1. Verify the product exists and belongs to the vendor
//     const existingProduct = await prisma.product.findFirst({
//       where: { id: id, vendorId: vendorId }
//     });

//     if (!existingProduct) {
//       return res.status(404).json({ message: "Product not found or unauthorized." });
//     }

//     // 2. Handle Images (Combine kept images with newly uploaded ones)
//     let finalImageUrls = [];
    
//     // Parse the existing images the user decided to keep
//     if (existingImages) {
//       finalImageUrls = JSON.parse(existingImages);
//     }

//     // Add any newly uploaded images from Cloudinary/Multer
//     if (req.files && req.files.length > 0) {
//       const newImageUrls = req.files.map(file => file.path);
//       finalImageUrls = [...finalImageUrls, ...newImageUrls];
//     }

//     // Enforce the 5 image limit on the backend just to be safe
//     if (finalImageUrls.length > 5) {
//       return res.status(400).json({ message: "A product cannot have more than 5 images." });
//     }

//     // 3. Update the database
//     const updatedProduct = await prisma.product.update({
//       where: { id: id },
//       data: {
//         name,
//         category,
//         description,
//         price: parseFloat(price),
//         compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
//         stockQuantity: parseInt(stockQuantity),
//         status,
//         imageUrls: finalImageUrls
//       }
//     });

//     res.status(200).json({ 
//       message: "Product updated successfully!", 
//       product: updatedProduct 
//     });

//   } catch (error) {
//     console.error("Update Product Error:", error);
//     res.status(500).json({ message: "Server error while updating product." });
//   }
// };




const prisma = require('../config/db');
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
    
    // --- 1. FETCH VENDOR PLAN & ENFORCE LIMITS ---
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { plan: true, _count: { select: { products: true } } }
    });

    const currentPlan = vendor.plan || "FREE";
    const productCount = vendor._count.products;

    // Check Product Quantity Limits
    if (currentPlan === "FREE" && productCount >= 10) {
      return res.status(403).json({ 
        message: "You have reached the 10-product limit on the Free plan. Please upgrade to add more." 
      });
    }

    if (currentPlan === "STARTER" && productCount >= 100) {
      return res.status(403).json({ 
        message: "You have reached the 100-product limit on the Starter plan. Please upgrade to Growth." 
      });
    }

    // Check Image Upload Limits
    const incomingImagesCount = req.files ? req.files.length : 0;
    
    if (currentPlan === "FREE" && incomingImagesCount > 1) {
      return res.status(403).json({ message: "Free plan allows only 1 image per product." });
    }
    if (currentPlan === "STARTER" && incomingImagesCount > 3) {
      return res.status(403).json({ message: "Starter plan allows up to 3 images per product." });
    }
    if (currentPlan === "GROWTH" && incomingImagesCount > 5) {
      return res.status(403).json({ message: "Growth plan allows up to 5 images per product." });
    }
    // --- END LIMIT ENFORCEMENT ---

    const { name, category, description, price, compareAtPrice, stockQuantity, status } = req.body;

    // 2. Upload buffers to Cloudinary using Promise.all
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      imageUrls = await Promise.all(uploadPromises); 
    }

    // 3. Save to database 
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
    const vendorId = req.vendor.id; 
    const { id } = req.params; 

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
        vendorId: vendorId 
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

    // 1. Verify the product exists, belongs to the vendor, AND fetch their plan
    const existingProduct = await prisma.product.findFirst({
      where: { id: id, vendorId: vendorId },
      include: { vendor: { select: { plan: true } } } // Fetch plan to enforce image limits
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found or unauthorized." });
    }

    const currentPlan = existingProduct.vendor.plan || "FREE";

    // 2. Handle Images (Combine kept images with newly uploaded ones)
    let finalImageUrls = [];
    
    // Parse the existing images the user decided to keep
    if (existingImages) {
      finalImageUrls = JSON.parse(existingImages);
    }

    // Add any newly uploaded images from Cloudinary (FIXED: Uses uploadToCloudinary)
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      const newImageUrls = await Promise.all(uploadPromises);
      finalImageUrls = [...finalImageUrls, ...newImageUrls];
    }

    // --- ENFORCE IMAGE UPLOAD LIMITS ON UPDATE ---
    const totalImages = finalImageUrls.length;
    
    if (currentPlan === "FREE" && totalImages > 1) {
      return res.status(403).json({ message: "Free plan allows only 1 image per product." });
    }
    if (currentPlan === "STARTER" && totalImages > 3) {
      return res.status(403).json({ message: "Starter plan allows up to 3 images per product." });
    }
    if (currentPlan === "GROWTH" && totalImages > 5) {
      return res.status(403).json({ message: "Growth plan allows up to 5 images per product." });
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