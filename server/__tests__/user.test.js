const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('User API', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      name: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should not register an existing user', async () => {
    // First, register a user
    await request(app).post('/api/auth/signup').send({
      name: 'testuser2',
      email: 'testuser2@example.com',
      password: 'password123',
    });
    // Then, try to register the same user again
    const res = await request(app).post('/api/auth/signup').send({
      name: 'testuser2',
      email: 'testuser2@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });
});
