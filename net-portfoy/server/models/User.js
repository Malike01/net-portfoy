const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const featureSchema = new mongoose.Schema({
  featureKey: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['trial', 'active', 'expired'], 
    default: 'trial' 
  },
  trialStartDate: { type: Date }, 
  purchaseDate: { type: Date }, 
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  isPhoneVerified: { type: Boolean, default: false },
  role: { type: String, default: 'admin' }, 
  otpCode: { type: String }, 
  otpExpires: { type: Date },
  features: [featureSchema],
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);