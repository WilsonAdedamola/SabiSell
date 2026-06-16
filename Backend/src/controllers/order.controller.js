const prisma = require('../config/db');
// @route   GET /api/orders
// @desc    Get all orders for the vendor dashboard/sales page
exports.getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    const orders = await prisma.order.findMany({
      where: { vendorId },
      include: {
        items: true // Crucial: Includes the purchased products for the Orders Details modal
      },
      orderBy: { createdAt: 'desc' }
    });

    // Map the database output to include BOTH the raw data (for Orders.jsx) 
    // AND the aliases (for Sales.jsx)
    const formattedOrders = orders.map(order => ({
      ...order, // <--- THIS RESTORES ALL DETAILS (shippingAddress, items, phone, subtotal, etc.)
      
      // Aliases required specifically for the Sales.jsx page formatting
      id: order.orderNumber, 
      total: order.totalAmount, 
      date: order.createdAt,
      customerName: order.customerName || "Guest User",
      channel: order.channel ? order.channel.toUpperCase() : "ONLINE",
      paymentMethod: order.paymentMethod ? order.paymentMethod.toUpperCase() : "CARD",
    }));

    res.status(200).json({
      count: formattedOrders.length,
      orders: formattedOrders
    });

  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
};

// @route   POST /api/orders/offline
// @desc    Record an offline sale and automatically deduct inventory
exports.recordOfflineSale = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { productId, quantity, customerName, paymentMethod, amountPaid } = req.body;

    // 1. Verify Vendor Plan
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { plan: true }
    });

    const currentPlan = vendor.plan || "FREE";
    if (currentPlan === "FREE") {
      return res.status(403).json({ message: "Offline sales tracking requires the Starter or Growth plan." });
    }

    // 2. Verify Product and Stock availability
    const product = await prisma.product.findFirst({
      where: { id: productId, vendorId: vendorId, status: { not: "ARCHIVED" } }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const parsedQuantity = parseInt(quantity);
    if (product.stockQuantity < parsedQuantity) {
      return res.status(400).json({ 
        message: `Insufficient stock. You only have ${product.stockQuantity} units left.` 
      });
    }

    // 3. Generate Offline Order Number
    const orderNumber = `OFF-${Math.floor(1000 + Math.random() * 9000)}`;
    const parsedAmountPaid = parseFloat(amountPaid);

    // 4. Perform Prisma Transaction
    const transaction = await prisma.$transaction(async (tx) => {
      
      // A. Create the Order with snapshot items
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          vendorId,
          customerName: customerName || "Walk-in Customer",
          
          customerEmail: "N/A", 
          customerPhone: "N/A",
          
          // Pass a fallback JSON object to satisfy the shippingAddress requirement ---
          shippingAddress: {
            address: "In-Store Pickup",
            city: "N/A",
            state: "N/A"
          },
          
          subtotal: parsedAmountPaid,
          deliveryFee: 0,
          totalAmount: parsedAmountPaid,
          status: "Delivered", // Offline sales are instantly fulfilled
          paymentMethod: paymentMethod, // CASH, POS, TRANSFER
          paymentStatus: "PAID",
          channel: "OFFLINE", 
          items: {
            create: [
              {
                productId: product.id,
                name: product.name,
                image: product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : null,
                quantity: parsedQuantity,
                priceAtPurchase: parsedAmountPaid / parsedQuantity // Unit price logic
              }
            ]
          }
        },
      });

      // B. Deduct the stock from the Product
      await tx.product.update({
        where: { id: productId },
        data: {
          stockQuantity: {
            decrement: parsedQuantity
          }
        }
      });

      return newOrder;
    });

    res.status(201).json({ message: "Offline sale recorded successfully!", order: transaction });

  } catch (error) {
    console.error("Record Offline Sale Error:", error);
    res.status(500).json({ message: "Server error while recording offline sale." });
  }
};

// @route   PUT /api/orders/:id/status
// @desc    Update order status (e.g., Pending -> Shipped)
exports.updateOrderStatus = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { id } = req.params; // This receives the orderNumber from the frontend (e.g., SABI-1234)
    const { status } = req.body;

    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    
    const matchedStatus = validStatuses.find(s => s.toLowerCase() === status.toLowerCase());
    
    if (!matchedStatus) {
      return res.status(400).json({ message: "Invalid status update." });
    }

    // FIXED: Use OR to find the order by either its UUID or its orderNumber
    const updatedOrder = await prisma.order.updateMany({
      where: { 
        vendorId,
        OR: [
          { id: id },
          { orderNumber: id }
        ]
      },
      data: { status: matchedStatus }
    });

    if (updatedOrder.count === 0) {
      return res.status(404).json({ message: "Order not found or unauthorized." });
    }

    res.status(200).json({ message: `Order marked as ${matchedStatus}!` });

  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Server error while updating order." });
  }
};