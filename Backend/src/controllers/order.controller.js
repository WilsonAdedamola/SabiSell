const prisma = require('../config/db');

// @route   POST /api/orders/dummy
// @desc    Generate a fake order for testing purposes
exports.createDummyOrder = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    // 1. Find at least one product to "buy"
    const product = await prisma.product.findFirst({
      where: { vendorId, status: "ACTIVE" }
    });

    if (!product) {
      return res.status(400).json({ message: "You need to add at least one active product first!" });
    }

    // 2. Create a fake customer
    const customer = await prisma.customer.create({
      data: {
        vendorId,
        fullName: "Tolu Olayinka",
        email: "tolu.test@example.com",
        phone: "08012345678",
        address: "15 Admiralty Way, Lekki Phase 1, Lagos"
      }
    });

    // 3. Generate a random Order Number (e.g., SABI-8392)
    const orderNumber = `SABI-${Math.floor(1000 + Math.random() * 9000)}`;

    // 4. Create the Order and the OrderItem in one transaction
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        vendorId,
        customerId: customer.id,
        totalAmount: product.price, // Buying 1 quantity
        deliveryFee: 1500.00,
        status: "PENDING",
        paymentMethod: "TRANSFER",
        paymentStatus: "PAID",
        items: {
          create: [
            {
              productId: product.id,
              quantity: 1,
              priceAtPurchase: product.price
            }
          ]
        }
      },
      include: {
        customer: true,
        items: {
          include: { product: true }
        }
      }
    });

    res.status(201).json({
      message: "Dummy order generated successfully!",
      order: newOrder
    });

  } catch (error) {
    console.error("Dummy Order Error:", error);
    res.status(500).json({ message: "Server error while creating dummy order." });
  }
};

// @route   GET /api/orders
// @desc    Get all orders for the vendor dashboard
exports.getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    const orders = await prisma.order.findMany({
      where: { vendorId },
      include: {
        customer: true,
        items: {
          include: {
            product: {
              select: { name: true, imageUrls: true } // Only grab what we need for the UI
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      count: orders.length,
      orders
    });

  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
};

// @route   PUT /api/orders/:id/status
// @desc    Update order status (e.g., PENDING -> SHIPPED)
exports.updateOrderStatus = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { id } = req.params; // The order ID from the URL
    const { status } = req.body;

    const validStatuses = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status update." });
    }

    // Ensure the order actually belongs to this logged-in vendor
    const updatedOrder = await prisma.order.updateMany({
      where: { id, vendorId },
      data: { status }
    });

    if (updatedOrder.count === 0) {
      return res.status(404).json({ message: "Order not found or unauthorized." });
    }

    res.status(200).json({ message: `Order marked as ${status}!` });

  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Server error while updating order." });
  }
};