const prisma = require('../config/db');

// @route   GET /api/storefront/:storeLink
// @desc    Get public store details (Name, Logo, Description)
exports.getStoreDetails = async (req, res) => {
  try {
    const { storeLink } = req.params;

    // We use "select" to ONLY grab public data. No passwords or emails!
    const store = await prisma.vendor.findUnique({
      where: { storeLink },
      select: {
        id: true,
        storeName: true,
        storeDescription: true,
        storeType: true,
        logoUrl: true,
        isOnline: true
      }
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    if (!store.isOnline) {
      return res.status(403).json({ message: "This store is currently offline." });
    }

    res.status(200).json({ store });

  } catch (error) {
    console.error("Fetch Store Error:", error);
    res.status(500).json({ message: "Server error while fetching store details." });
  }
};

// @route   GET /api/storefront/:storeLink/products
// @desc    Get all active products for a specific store
exports.getStoreProducts = async (req, res) => {
  try {
    const { storeLink } = req.params;

    // Prisma lets us search for products through the Vendor's storeLink seamlessly!
    const products = await prisma.product.findMany({
      where: {
        vendor: { storeLink: storeLink },
        status: "ACTIVE" // Only show products that are active, hide drafts
      },
      select: {
        id: true,
        name: true,
        price: true,
        compareAtPrice: true,
        imageUrls: true,
        category: true
        // Notice we don't send stockQuantity here. Customers usually just need to know "In Stock" or "Out of Stock"
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ 
      count: products.length,
      products 
    });

  } catch (error) {
    console.error("Fetch Public Products Error:", error);
    res.status(500).json({ message: "Server error while fetching products." });
  }
};

// @route   GET /api/storefront/product/:productId
// @desc    Get full details for a single product
exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product || product.status !== "ACTIVE") {
      return res.status(404).json({ message: "Product not found or unavailable." });
    }

    res.status(200).json({ product });

  } catch (error) {
    console.error("Fetch Single Product Error:", error);
    res.status(500).json({ message: "Server error while fetching product details." });
  }
};