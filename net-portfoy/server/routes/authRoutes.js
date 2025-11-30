const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', loginUser);
router.post('/verify-phone', protect, verifyPhone);

module.exports = router;