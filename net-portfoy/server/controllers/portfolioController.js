const Portfolio = require('../models/Portfolio');

// @desc   
// @route   GET /api/portfolios
const getPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(portfolios);
};

// @desc   
// @route   GET /api/portfolios/:id
const getPortfolioById = async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    res.status(404);
    throw new Error('Portföy bulunamadı');
  }

  if (portfolio.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Bu portföyü görüntüleme yetkiniz yok');
  }

  res.status(200).json(portfolio);
};

// @desc    
// @route   POST /api/portfolios
const createPortfolio = async (req, res) => {
  if (!req.body.title || !req.body.price) {
    res.status(400);
    throw new Error('Lütfen Başlık ve Fiyat alanlarını doldurun');
  }

  const portfolio = await Portfolio.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json(portfolio);
};

// @desc   
// @route   PUT /api/portfolios/:id
const updatePortfolio = async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    res.status(404);
    throw new Error('Portföy bulunamadı');
  }

  if (portfolio.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Yetkisiz işlem');
  }

  const updatedPortfolio = await Portfolio.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedPortfolio);
};

// @desc   
// @route   DELETE /api/portfolios/:id
const deletePortfolio = async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    res.status(404);
    throw new Error('Portföy bulunamadı');
  }

  if (portfolio.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Yetkisiz işlem');
  }

  await portfolio.deleteOne();

  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};