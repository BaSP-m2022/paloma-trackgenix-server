import request from 'supertest';
import app from '../app';
import project from '../models/Projects';
import projectSeeds from '../seeds/projects';

beforeAll(async () => {
  await project.collection.insertMany(projectSeeds);
});

describe('POST /Projects/create', () => {
  test('It should return a status code 201', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '25',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.statusCode).toBe(201);
  });
  test('It should return at least one project', async () => {
    const response = await request(app).get('/projects').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '25',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.body.length).toBeGreaterThan(0);
  });
  test('It should return a status code 400 - Missing project name', async () => {
    const response = await request(app).post('/projects').send({
      projectName: '',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '25',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.status).toBe(400);
  });
  test('It should return a status code 400 - Missing total hours', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Project 2345',
      totalHours: '',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '25',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.status).toBe(400);
  });
  test('It should return a status code 400 - Missing project description', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: '',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '25',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.status).toBe(400);
  });
  test('It should return a status code 400 - Missing start date', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '25',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.status).toBe(400);
  });
  test('It should return a status code 400 - Missing finish date', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '25',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.status).toBe(400);
  });
  test('It should return a status code 400 - Missing state', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: '',
      employee: [{
        role: 'QA',
        rate: '25',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.status).toBe(400);
  });
  test('It should return a status code 400 - Missing employee role', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: '',
        rate: '25',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.status).toBe(400);
  });
  test('It should return a status code 400 - Missing employee rate', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '',
        employeeId: '628a6a4d9397655c03855a13',
      }],
    });
    expect(response.status).toBe(400);
  });
  test('It should return a status code 400 - Missing employee id', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Project 2345',
      totalHours: '48',
      projectDescription: 'TEST Description 2',
      startDate: '2022-03-12T03:00:00.000+00:00',
      finishDate: '2022-05-01T03:00:00.000+00:00',
      state: 'finished',
      employee: [{
        role: 'QA',
        rate: '25',
        employeeId: '',
      }],
    });
    expect(response.status).toBe(400);
  });
  test('It should return a message - Missing date', async () => {
    const response = await request(app).post('/projects').send({
      projectName: '',
      totalHours: '',
      projectDescription: '',
      startDate: '',
      finishDate: '',
      state: '',
      employee: [{
        role: '',
        rate: '',
        employeeId: '',
      }],
    });
    expect(response.body.message).toEqual('Error in the request');
  });
});

describe('DELETE /Projects', () => {
  test('It should return a status code 200, error false and message \'Deleted!\'', async () => {
    const response = await request(app).delete('/projects/628bc4a3a60db4d71c872757').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('Deleted!');
  });
  test('It should return message \'The project has not been found\'', async () => {
    const response = await request(app).delete('/projects/628bc4a3a60db4d71c872845').send();
    expect(response.body.message).toEqual('The project has not been found');
  });
  test('It should return a status code 404 because the id is incorrect', async () => {
    const response = await request(app).delete('/projects/628bc4a3a60db4d71c872845').send();
    expect(response.status).toBe(404);
  });
  test('It should return a status code 404 because is missing id parameter', async () => {
    const response = await request(app).delete('/projects/').send();
    expect(response.status).toBe(404);
  });
  test('It should return an error true', async () => {
    const response = await request(app).delete('/projects/628bc4a3a60db4d71c872845').send();
    expect(response.body.error).toBeTruthy();
  });
  test('It should return a status code 500', async () => {
    const response = await request(app).delete('/projects/84').send();
    expect(response.status).toBe(500);
  });
  test('It should return message \'An error has ocurred\'', async () => {
    const response = await request(app).delete('/projects/84').send();
    expect(response.body.message).toEqual('An error has ocurred');
  });
  test('It should return an error true', async () => {
    const response = await request(app).delete('/projects/84').send();
    expect(response.body.error).toBeTruthy();
  });
});
