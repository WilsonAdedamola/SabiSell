const prisma = require("../config/db");

// @route   GET /api/notifications
// @desc    Get all notifications for the logged-in vendor
exports.getNotifications = async (req, res) => {
  try {
    const vendorId = req.vendor.id; // Assuming you have an auth middleware that sets req.vendor

    const notifications = await prisma.notification.findMany({
      where: { vendorId },
      orderBy: { createdAt: 'desc' }, // Newest first
      take: 50 // Limit to the 50 most recent to keep the app fast
    });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    res.status(500).json({ message: "Server error fetching notifications." });
  }
};

// @route   PUT /api/notifications/read-all
// @desc    Mark all unread notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    await prisma.notification.updateMany({
      where: { 
        vendorId,
        isRead: false 
      },
      data: { isRead: true }
    });

    res.status(200).json({ message: "All notifications marked as read." });
  } catch (error) {
    console.error("Mark All Read Error:", error);
    res.status(500).json({ message: "Server error updating notifications." });
  }
};

// @route   PUT /api/notifications/:id/read
// @desc    Mark a single notification as read
exports.markAsRead = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { id } = req.params;

    // We use updateMany here as a trick to ensure the notification 
    // actually belongs to this specific vendor before updating it
    const updated = await prisma.notification.updateMany({
      where: { 
        id, 
        vendorId 
      },
      data: { isRead: true }
    });

    if (updated.count === 0) {
      return res.status(404).json({ message: "Notification not found or unauthorized." });
    }

    res.status(200).json({ message: "Notification marked as read." });
  } catch (error) {
    console.error("Mark Read Error:", error);
    res.status(500).json({ message: "Server error updating notification." });
  }
};