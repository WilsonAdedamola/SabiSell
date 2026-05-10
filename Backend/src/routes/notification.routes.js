const express = require('express');
const router = express.Router();
const { 
  getNotifications, 
  markAsRead, 
  markAllAsRead 
} = require('../controllers/notification.controller');
const { protect } = require('../middlewares/auth.middleware');

// Apply the protect middleware to all notification routes
router.use(protect);

// GET /api/notifications
router.get('/', getNotifications);

// PUT /api/notifications/read-all 
// (CRITICAL: This must go BEFORE the /:id route, otherwise Express thinks "read-all" is an ID)
router.put('/read-all', markAllAsRead);

// PUT /api/notifications/:id/read
router.put('/:id/read', markAsRead);

module.exports = router;