const prisma = require('../config/db');

// Helper function to safely calculate percentage growth
const calculateGrowth = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

// @route   GET /api/analytics
// @desc    Get live dashboard analytics (Revenue, Trends, Top Products)
exports.getAnalytics = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { range } = req.query; // 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month', 'All Time'

    // 1. Calculate Date Ranges (Current Period vs Previous Period)
    const now = new Date();
    let currentStart = new Date();
    let currentEnd = new Date();
    let prevStart = new Date();
    let prevEnd = new Date();

    // Standardize to end of day for precise calculations
    currentEnd.setHours(23, 59, 59, 999);

    if (range === 'This Month') {
      currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
      prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      prevEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    } else if (range === 'Last Month') {
      currentStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      currentEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      prevStart = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      prevEnd = new Date(now.getFullYear(), now.getMonth() - 1, 0, 23, 59, 59, 999);
    } else if (range === 'Last 30 Days') {
      currentStart.setDate(now.getDate() - 29);
      currentStart.setHours(0, 0, 0, 0);
      prevStart = new Date(currentStart);
      prevStart.setDate(prevStart.getDate() - 30);
      prevEnd = new Date(currentStart);
      prevEnd.setMilliseconds(-1);
    } else if (range === 'All Time') {
      currentStart = new Date(2000, 0, 1);
      prevStart = new Date(2000, 0, 1);
      prevEnd = new Date(2000, 0, 1);
    } else {
      // Default: Last 7 Days
      currentStart.setDate(now.getDate() - 6);
      currentStart.setHours(0, 0, 0, 0);
      prevStart = new Date(currentStart);
      prevStart.setDate(prevStart.getDate() - 7);
      prevEnd = new Date(currentStart);
      prevEnd.setMilliseconds(-1);
    }

    // 2. Fetch Orders for the Current and Previous Periods
    // We use "not: Cancelled" so pending/pay-later orders are still counted in revenue
    const [currentOrders, previousOrders] = await Promise.all([
      prisma.order.findMany({
        where: { 
          vendorId, 
          status: { not: "Cancelled" },
          createdAt: { gte: currentStart, lte: currentEnd } 
        },
        include: { items: { include: { product: true } } }
      }),
      prisma.order.findMany({
        where: { 
          vendorId, 
          status: { not: "Cancelled" },
          createdAt: { gte: prevStart, lte: prevEnd } 
        }
      })
    ]);

    // 3. Calculate Current Overview Metrics
    let totalRevenue = 0;
    let onlineRevenue = 0;
    let offlineRevenue = 0;

    currentOrders.forEach(order => {
      const amount = Number(order.totalAmount) || 0;
      totalRevenue += amount;
      // If channel is explicitly OFFLINE, add to offline. Otherwise, treat as ONLINE.
      if (order.channel === 'OFFLINE') {
        offlineRevenue += amount;
      } else {
        onlineRevenue += amount;
      }
    });

    const totalOrders = currentOrders.length;

    // 4. Calculate Previous Overview Metrics for Growth
    let prevRevenue = 0;
    previousOrders.forEach(order => { prevRevenue += Number(order.totalAmount) || 0; });
    const prevOrders = previousOrders.length;

    // 5. Calculate Simulated Conversion Metrics based on live order volume
    // (Until a page-view tracking database model is added)
    const storeVisits = totalOrders > 0 ? Math.round(totalOrders * 4.2) : 0;
    const prevStoreVisits = prevOrders > 0 ? Math.round(prevOrders * 4.2) : 0;
    
    const conversionRate = storeVisits > 0 ? parseFloat(((totalOrders / storeVisits) * 100).toFixed(1)) : 0;
    const prevConversionRate = prevStoreVisits > 0 ? parseFloat(((prevOrders / prevStoreVisits) * 100).toFixed(1)) : 0;

    // 6. Calculate Top Products Aggregation
    const productSalesMap = {};
    
    currentOrders.forEach(order => {
      order.items.forEach(item => {
        if (!productSalesMap[item.productId]) {
          productSalesMap[item.productId] = {
            id: item.productId,
            name: item.name || "Unknown Product",
            category: item.product?.category || "Uncategorized",
            sold: 0,
            revenue: 0,
            stock: item.product?.stockQuantity || 0
          };
        }
        productSalesMap[item.productId].sold += item.quantity;
        const itemPrice = Number(item.priceAtPurchase) || (Number(order.totalAmount) / item.quantity); 
        productSalesMap[item.productId].revenue += (item.quantity * itemPrice);
      });
    });

    const topProducts = Object.values(productSalesMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5); // Limit to top 5

    // 7. Calculate Dynamic Sales Trend Chart
    const salesTrend = [];
    
    // If "All Time", we won't show millions of daily bars, so we limit to 30 for safety
    const daysToIterate = range === "All Time" ? 30 : Math.round((currentEnd - currentStart) / (1000 * 60 * 60 * 24));
    
    let loopDate = new Date(currentStart);
    if (range === "All Time") {
       loopDate = new Date(currentEnd);
       loopDate.setDate(loopDate.getDate() - 29); // Show last 30 days of "All time"
    }

    while (loopDate <= currentEnd) {
      const dateString = loopDate.toDateString();
      const label = loopDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g., "Jun 17"

      // Sum orders that occurred on this specific day loop
      const daySales = currentOrders
        .filter(o => new Date(o.createdAt).toDateString() === dateString)
        .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

      salesTrend.push({ label, sales: daySales });
      loopDate.setDate(loopDate.getDate() + 1); // increment day
    }

    // 8. Send structured data to frontend
    res.status(200).json({
      overview: {
        totalRevenue,
        revenueGrowth: calculateGrowth(totalRevenue, prevRevenue),
        totalOrders,
        ordersGrowth: calculateGrowth(totalOrders, prevOrders),
        storeVisits,
        visitsGrowth: calculateGrowth(storeVisits, prevStoreVisits),
        conversionRate,
        conversionGrowth: calculateGrowth(conversionRate, prevConversionRate),
        onlineRevenue,
        offlineRevenue,
      },
      salesTrend,
      topProducts
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Server error generating live analytics." });
  }
};