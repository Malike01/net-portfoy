const express = require('express');
const router = express.Router();
const { startTrial, purchaseFeature } = require('../controllers/featureController');
const { protect } = require('../middleware/authMiddleware');

router.post('/start-trial', protect, startTrial);
router.post('/purchase', protect, purchaseFeature);

module.exports = router;