const prisma = require('../config/db');

// @route   GET /api/analytics
// @desc    Get dashboard analytics (Revenue, Trends, Top Products)
exports.getAnalytics = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { range } = req.query; // E.g., 'Last 7 Days', 'This Month'

    // 1. Fetch all completed orders for this vendor
    const orders = await prisma.order.findMany({
      where: { 
        vendorId, 
        status: { notIn: ["CANCELLED", "Pending"] } // Only count valid sales
      },
      include: {
        items: {
          include: { product: true } // Include product to get current stock and category
        }
      }
    });

    // 2. Calculate Overview Metrics
    let totalRevenue = 0;
    let onlineRevenue = 0;
    let offlineRevenue = 0;

    orders.forEach(order => {
      const amount = order.totalAmount || 0;
      totalRevenue += amount;
      if (order.channel === 'ONLINE') onlineRevenue += amount;
      if (order.channel === 'OFFLINE') offlineRevenue += amount;
    });

    // 3. Calculate Top Products Aggregation
    const productSalesMap = {};
    
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productSalesMap[item.productId]) {
          productSalesMap[item.productId] = {
            id: item.productId,
            name: item.name,
            category: item.product?.category || "Uncategorized",
            sold: 0,
            revenue: 0,
            stock: item.product?.stockQuantity || 0
          };
        }
        productSalesMap[item.productId].sold += item.quantity;
        // Fallback for price calculation
        const itemPrice = item.priceAtPurchase || (order.totalAmount / item.quantity); 
        productSalesMap[item.productId].revenue += (item.quantity * itemPrice);
      });
    });

    // Convert map to array, sort by highest revenue, and take top 5
    const topProducts = Object.values(productSalesMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // 4. Calculate Sales Trend (Last 7 Days)
    const salesTrend = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., "Mon"

      // Sum orders that match this specific day
      const daySales = orders
        .filter(o => new Date(o.createdAt).toDateString() === d.toDateString())
        .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

      salesTrend.push({ label, sales: daySales });
    }

    // 5. Send formatted data to frontend
    res.status(200).json({
      overview: {
        totalRevenue,
        revenueGrowth: 15.2, // Simulated growth metric (Needs historical comparison logic later)
        totalOrders: orders.length,
        ordersGrowth: 5.4,   // Simulated
        storeVisits: 1240,   // Simulated (Needs a tracking pixel later)
        visitsGrowth: -1.2,  // Simulated
        conversionRate: 2.8, // Simulated
        conversionGrowth: 0.5, // Simulated
        onlineRevenue,
        offlineRevenue,
      },
      salesTrend,
      topProducts
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Server error generating analytics." });
  }
};