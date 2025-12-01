const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const {
    verifyPhone,
} = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', loginUser);
router.post('/verify-phone', protect, verifyPhone);
router.put('/profile', protect, exports.updateProfile);

module.exports = router;