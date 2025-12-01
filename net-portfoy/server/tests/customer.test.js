const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
require('dotenv').config();

let token;
let customerId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD
    });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Müşteri (Customer) API Testleri', () => {

  // 1. ADD customer
  it('POST /api/customers - Yeni müşteri eklenmeli', async () => {
    const res = await request(app)
      .post('/api/customers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Müşterisi',
        phone: '5551234567',
        type: 'buyer',
        status: 'new'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('Test Müşterisi');
    customerId = res.body._id; 
  });

  // 2. GET customers
  it('GET /api/customers - Liste dönmeli', async () => {
    const res = await request(app)
      .get('/api/customers')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  // 3. DELETE customer
  it('DELETE /api/customers/:id - Müşteri silinmeli', async () => {
    const res = await request(app)
      .delete(`/api/customers/${customerId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});