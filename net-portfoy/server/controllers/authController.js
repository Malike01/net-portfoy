const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_TIME });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isPhoneVerified: user.isPhoneVerified, 
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
  }
};

exports.verifyPhone = async (req, res) => {
  const { code } = req.body;

  if (code && code.length === 6) {
    const user = await User.findById(req.user.id);
    
    if (user) {
      user.isPhoneVerified = true;
      await user.save();
      
      res.json({ 
        message: 'Telefon başarıyla doğrulandı', 
        isPhoneVerified: true 
      });
    } else {
      res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
  } else {
    res.status(400).json({ message: 'Geçersiz doğrulama kodu' });
  }
};

exports.resendCode = async (req, res) => {
  const { phone } = req.body; 
  const user = await User.findById(req.user.id);
  
  if (phone && !user.isPhoneVerified) {
    user.phone = phone;
  }

  if (!user.phone) {
    return res.status(400).json({ message: 'Lütfen önce telefon numarası giriniz' });
  }

  const otp = generateOTP();
  user.otpCode = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendSMS(user.phone, otp);

  res.json({ message: 'Kod gönderildi' });
};

exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    if (req.body.phone && req.body.phone !== user.phone) {
      user.phone = req.body.phone;
      
      user.isPhoneVerified = false; 
      user.otpCode = undefined;
      user.otpExpires = undefined;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      isPhoneVerified: updatedUser.isPhoneVerified, 
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }
};