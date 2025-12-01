const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth API Testleri', () => {
  
  it('POST /api/auth/login - Doğru şifre ile giriş yapılabilmeli', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: process.env.TEST_USER_EMAIL,    
        password: process.env.TEST_USER_PASSWORD
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /api/auth/login - Yanlış şifre ile hata dönmeli', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: process.env.TEST_USER_EMAIL,
        password: 'yanlis_sifre_denemesi' 
      });

    expect(res.statusCode).toEqual(401);
  });
});