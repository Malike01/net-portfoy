const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    
// @route   GET /api/users
const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(users);
};

// @desc   
// @route   POST /api/users
const createUser = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanımda.' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'user', 
    phone,
    isPhoneVerified: true 
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400).json({ message: 'Geçersiz kullanıcı verisi' });
  }
};

// @desc   
// @route   DELETE /api/users/:id
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user._id.toString() === req.user.id) {
        return res.status(400).json({ message: 'Kendinizi silemezsiniz.' });
    }
    
    await user.deleteOne();
    res.json({ message: 'Kullanıcı sistemden silindi.' });
  } else {
    res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }
};

module.exports = { getUsers, createUser, deleteUser };