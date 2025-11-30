const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, createSystemNotification } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getNotifications);
router.put('/:id/read', protect, markAsRead);
router.post('/system', protect, createSystemNotification);

module.exports = router;