const prisma = require('../config/db');

// // @route   POST /api/orders/dummy
// // @desc    Generate a fake order for testing purposes
// exports.createDummyOrder = async (req, res) => {
//   try {
//     const vendorId = req.vendor.id;

//     // 1. Find at least one product to "buy"
//     const product = await prisma.product.findFirst({
//       where: { vendorId, status: "ACTIVE" }
//     });

//     if (!product) {
//       return res.status(400).json({ message: "You need to add at least one active product first!" });
//     }

//     // 2. Create a fake customer for the CRM (Optional for guest checkouts, but good for testing)
//     const customer = await prisma.customer.create({
//       data: {
//         vendorId,
//         fullName: "Tolu Olayinka",
//         email: "tolu.test@example.com",
//         phone: "08012345678",
//         address: "15 Admiralty Way, Lekki Phase 1, Lagos"
//       }
//     });

//     // 3. Generate a random Order Number (e.g., SABI-8392)
//     const orderNumber = `SABI-${Math.floor(1000 + Math.random() * 9000)}`;
//     const deliveryFee = 1500.00;

//     // 4. Create the Order and the OrderItem in one transaction using the new schema requirements
//     const newOrder = await prisma.order.create({
//       data: {
//         orderNumber,
//         vendorId,
//         customerId: customer.id, // Linking to the CRM record we just made
        
//         // --- NEW: Order Snapshots ---
//         customerName: "Tolu Olayinka",
//         customerEmail: "tolu.test@example.com",
//         customerPhone: "08012345678",
//         shippingAddress: {
//           address: "15 Admiralty Way",
//           apartment: "Flat 4B",
//           city: "Lekki Phase 1",
//           state: "Lagos"
//         },
        
//         subtotal: product.price,
//         deliveryFee: deliveryFee,
//         totalAmount: Number(product.price) + deliveryFee,
        
//         status: "Pending", // Aligned with the React UI status casing
//         paymentMethod: "transfer",
//         paymentStatus: "PAID",
        
//         items: {
//           create: [
//             {
//               productId: product.id,
//               // --- NEW: Item Snapshots ---
//               name: product.name,
//               image: product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : null,
//               quantity: 1,
//               priceAtPurchase: product.price
//             }
//           ]
//         }
//       },
//       include: {
//         items: true // Include the items in the response so we can verify they were created
//       }
//     });

//     res.status(201).json({
//       message: "Dummy order generated successfully!",
//       order: newOrder
//     });

//   } catch (error) {
//     console.error("Dummy Order Error:", error);
//     res.status(500).json({ message: "Server error while creating dummy order." });
//   }
// };

// @route   GET /api/orders
// @desc    Get all orders for the vendor dashboard
exports.getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    const orders = await prisma.order.findMany({
      where: { vendorId },
      include: {
        // Because of our new snapshots, we only need to include items. 
        // We no longer have to deeply include the Customer or Product tables!
        items: true
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
// @desc    Update order status (e.g., Pending -> Shipped)
exports.updateOrderStatus = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { id } = req.params; // The order ID from the URL
    const { status } = req.body;

    // Adjusted to match standard e-commerce fulfillment statuses
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    
    // Case-insensitive check just to be safe
    const matchedStatus = validStatuses.find(s => s.toLowerCase() === status.toLowerCase());
    
    if (!matchedStatus) {
      return res.status(400).json({ message: "Invalid status update." });
    }

    // Ensure the order actually belongs to this logged-in vendor
    const updatedOrder = await prisma.order.updateMany({
      where: { id, vendorId },
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