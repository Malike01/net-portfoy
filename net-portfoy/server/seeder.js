const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const passwordToHash = process.env.ADMIN_USER_PASSWORD || ''; 
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordToHash, salt);

    await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_USER_EMAIL || '', 
      password: hashedPassword,
      role: 'admin',
      isPhoneVerified: true
    });

    console.log('Kullanıcı (ENV verileriyle) Eklendi!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();