// import { describe } from '@hapi/joi/lib/base';
import request from 'supertest';
import app from '../app';
import Superadmin from '../models/Superadmin';
import superAdminSeed from '../seeds/superAdmin';

let id;

beforeAll(async () => {
  await Superadmin.collection.insertMany(superAdminSeed);
});

describe('GET /superadmins', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/superadmins').send();
    expect(response.status).toBe(200);
  });

  test('Response should return data greater than 0', async () => {
    const response = await request(app).get('/superadmins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('Response should return a false error', async () => {
    const response = await request(app).get('/superadmins').send();
    expect(response.body.error).toBeFalsy();
  });
});

describe('POST /superadmins', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).post('/superadmins').send({
      name: 'juan',
      lastName: 'miller',
      email: 'juanmiller@gmail.com',
      password: 'qw123123',
    });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    id = response.body.data._id;
  });

  test('Response should return a status 400 - Missing password', async () => {
    const response = await request(app).post('/superadmins').send({
      name: 'juan',
      lastName: 'miller',
      email: 'juanmiller@gmail.com',
    });
    expect(response.status).toBe(400);
  });

  test('Response should return a status 400 - Missing email', async () => {
    const response = await request(app).post('/superadmins').send({
      name: 'juan',
      lastName: 'miller',
      password: 'qw123123',
    });
    expect(response.status).toBe(400);
  });

  test('Response should return a status 400 - Missing lastname', async () => {
    const response = await request(app).post('/superadmins').send({
      name: 'juan',
      email: 'juanmiller@gmail.com',
      password: 'qw123123',
    });
    expect(response.status).toBe(400);
  });

  test('Response should return a status 400 - Missing name', async () => {
    const response = await request(app).post('/superadmins').send({
      lastName: 'miller',
      email: 'juanmiller@gmail.com',
      password: 'qw123123',
    });
    expect(response.status).toBe(400);
  });

  test('Response should return an error message - Missing all data', async () => {
    const response = await request(app).post('/superadmins').send({});
    expect(response.body.message).toEqual('There was an error during validation of the request');
  });

  test('Response should return an error true - Missing all data', async () => {
    const response = await request(app).post('/superadmins').send({});
    expect(response.body.error).toBeTruthy();
  });
});

describe('GET By ID /superadmins', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get(`/superadmins/${id}`).send();
    expect(response.status).toBe(200);
  });

  test('Response should return an error', async () => {
    const response = await request(app).get('/superadmins/62825151c2380439abdfa145').send();
    expect(response.body.error).toBeTruthy();
  });
});
