import request from 'supertest';
import app from '../app';
import project from '../models/Projects';
import projectSeeds from '../seeds/projects';

beforeAll(async () => {
  await project.collection.insertMany(projectSeeds);
});

describe('GET /Projects', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });

  test('Response should return false error status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.error).toBe(false);
  });

  test('Response should return false error status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.error).toBe(true);
  });
});
