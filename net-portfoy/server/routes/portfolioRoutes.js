const express = require('express');
const router = express.Router();
const {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolioController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getPortfolios)
  .post(protect, createPortfolio);

router.route('/:id')
  .get(protect, getPortfolioById) 
  .put(protect, updatePortfolio)
  .delete(protect, deletePortfolio);

module.exports = router;