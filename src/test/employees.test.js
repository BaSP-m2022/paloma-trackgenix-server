import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

describe('GET /employees', () => {
  test('The response should return a 200 code status', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
    console.log(response);
  });
});
