const express = require('express');
const router = express.Router();
const { getDashboardStats, completeAgendaItem } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getDashboardStats);
router.put('/:id/complete', protect, completeAgendaItem);

module.exports = router;