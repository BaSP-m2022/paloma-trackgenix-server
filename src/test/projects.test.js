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

  test('Response should have at least 1 object', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('The role of the employee should be QA ', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body[0].employee[0].role).toBe('QA');
  });

  test('It should not get status 500', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).not.toBe(500);
  });
});

describe('GET /ProjectsById', () => {
  test('Response should return a 404 status', async () => {
    const response = await request(app).get('/projects/628bc4a3a60db4d71c872788').send();
    expect(response.status).toBe(404);
  });

  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/projects/628bc4a3a60db4d71c872757').send();
    expect(response.status).toBe(200);
  });

  test('Response should return a 500 status', async () => {
    const response = await request(app).get('/projects/628bc4a3a6').send();
    expect(response.status).toBe(500);
  });
});

describe('put /Projects', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).put('/projects/628bc4a3a60db4d71c872757').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '27',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.status).toBe(200);
  });

  test('Response should return a 200 status', async () => {
    const response = await request(app).put('/projects/628bc4a3a60db4d71c872757').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '27',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.body.error).toBeFalsy();
  });

  test('Response should return error truth', async () => {
    const response = await request(app).put('/projects/628bc4a3a60db4d71c872757').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '27',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.body.error).toBeTruthy();
  });

  test('Response should return a 404 status', async () => {
    const response = await request(app).put('/projects/628bc4a3a60db4d71c872788').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '27',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.status).toBe(404);
  });

  test('Response should return status error(400)', async () => {
    const response = await request(app).put('/projects/_id').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '27',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.status).toBe(400);
  });
});
