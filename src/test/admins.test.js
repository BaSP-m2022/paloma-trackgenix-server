import request from 'supertest';
import app from '../app';
import Admin from '../models/Admin';
import admins from '../seeds/admins';

beforeAll(async () => {
  await Admin.collection.insertMany(admins);
});

describe('GET /admins', () => {
  test('It should return the correct message', async () => {
    const response = await request(app).get('/admin').send();
    expect(response.body.message).toBe('Showing the complete list of admins.');
  });

  test('It should return a status code 200', async () => {
    const response = await request(app).get('/admin').send();
    expect(response.statusCode).toBe(200);
  });

  test('It should return at least one admin', async () => {
    const response = await request(app).get('/admin').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('It should return false', async () => {
    const response = await request(app).get('/admin').send();
    expect(response.body.error).toBe(false);
  });
});

describe('POST /admins/create', () => {
  test('It should return a status code 201', async () => {
    const response = await request(app).post('/admin').send({
      name: 'juan',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.statusCode).toBe(201);
  });

  test('It should return at least one admin', async () => {
    const response = await request(app).get('/admin').send({
      name: 'juan',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('It should return false', async () => {
    const response = await request(app).get('/admin').send({
      name: 'juan',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.body.error).toBe(false);
  });

  test('It should return the correct message', async () => {
    const response = await request(app).post('/admin').send({
      name: 'juan',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.body.message).toBe('Admin created');
  });

  test('It should return a 400 status code message', async () => {
    const response = await request(app).post('/admin').send();
    expect(response.statusCode).toBe(400);
  });
});
