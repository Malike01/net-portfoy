const Customer = require('../models/Customer');

// @desc    
// @route   GET /api/customers
const getCustomers = async (req, res) => {
  const customers = await Customer.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(customers);
};

// @desc    
// @route   POST /api/customers
const createCustomer = async (req, res) => {
  const { name, phone, customerType } = req.body;

  if (!name || !phone || !customerType) {
    res.status(400);
    throw new Error('Lütfen Ad Soyad, Telefon ve Müşteri Tipi alanlarını doldurun');
  }

  const customer = await Customer.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json(customer);
};

// @desc    
// @route   PUT /api/customers/:id
const updateCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error('Müşteri bulunamadı');
  }

  if (customer.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Bu işlem için yetkiniz yok');
  }

  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body, 
    { new: true }
  );

  res.status(200).json(updatedCustomer);
};

// @desc    
// @route   DELETE /api/customers/:id
const deleteCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error('Müşteri bulunamadı');
  }

  if (customer.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Bu işlem için yetkiniz yok');
  }

  await customer.deleteOne();

  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};