// tests/server.test.js
import request from 'supertest';
import { app } from '../server.js';
import mongoose from 'mongoose';

afterAll(async () => {
await mongoose.connection.close();
});

describe('Server Tests', () => {
test('GET /api/data should return hello message', async () => {
    const response = await request(app)
    .get('/api/data');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello from the back-end!' });
});
});