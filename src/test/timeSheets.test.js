import request from 'supertest';
import Employees from '../models/Employees';
import TimeSheets from '../models/Timesheets';
import Tasks from '../models/Tasks';
import Projects from '../models/Projects';
import timeSheetSeed, { relatedEmployee, relatedProject, relatedTask } from '../seeds/timeSheets';
import app from '../app';

beforeAll(async () => {
  await Employees.collection.insertOne(relatedEmployee);
  await Tasks.collection.insertOne(relatedTask);
  await Projects.collection.insertOne(relatedProject);
  await TimeSheets.collection.insertMany(timeSheetSeed);
});

describe('Get by id', () => {
  test('Return timesheet by id populated', async () => {
    const response = await request(app).get('/timesheets/6287be8ffe1a69c4beb07aec');
    expect(response.body.employee.name).toBe('Ana');
    expect(response.body.project.projectName).toBe('trackgenix');
    expect(response.body.task.taskName).toBe('task number 1');
    expect(response.statusCode).toBe(200);
  });
  test('Return not found id', async () => {
    const response2 = await request(app).get('/timesheets/3334be8ffe1a69c4beb07aec');
    expect(response2.body.startDate).toBe(undefined);
    expect(response2.statusCode).toBe(404);
  });
});
describe('Get all', () => {
  test('get all', async () => {
    const response = await request(app).get('/timesheets');
    expect(response.body.length).toBe(2);
    expect(response.statusCode).toBe(200);
  });
});

describe('Post', () => {
  test('create', async () => {
    const response = await request(app).post('/timesheets').send({
      employee: '6287be7cddac0eb284448d89',
      startDate: new Date(),
      finishDate: new Date(),
      regularHours: 15,
      overtimeHours: 20,
      rate: 10,
      project: '6287c0e3b74c24e95ba445c3',
      task: '6287c0e92362f86561a44540',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.data.regularHours).toBe(15);
    const result = await TimeSheets.find({});
    expect(result.length).toBe(3);
  });

  test('bad request if create body is not complete', async () => {
    const response2 = await request(app).post('/timesheets').send({
      employee: '6287be7cddac0eb284448d89',
      startDate: new Date(),
      finishDate: new Date(),
      rate: 10,
      project: '6287c0e3b74c24e95ba445c3',
      task: '6287c0e92362f86561a44540',
    });
    expect(response2.statusCode).toBe(400);
    expect(response2.body.message).toBe('There was an error during validation of the request');
  });
});

describe('Delete', () => {
  test('Delete correct timesheet', async () => {
    const response = await request(app).delete('/timesheets/6287be8ffe1a69c4beb07aec');
    expect(response.statusCode).toBe(200);
    const result = await TimeSheets.find({});
    const found = result.find((t) => t._id === '6287be8ffe1a69c4beb07aec');
    expect(result.length).toBe(2);
    expect(found).toBe(undefined);
  });
  test('Return 404 when deleting wrong id', async () => {
    const response2 = await request(app).delete('/timesheets/6667be8ffe1a69c4beb07aec');
    expect(response2.statusCode).toBe(404);
    expect(response2.body.msg).toBe('The timesheet has not been found');
  });
});

describe('Put ', () => {
  test('Edit correct timesheet', async () => {
    const response = await request(app).put('/timesheets/1117be8ffe1a69c4beb07aec').send({
      regularHours: 111,
      overtimeHours: 222,
      rate: 333,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.regularHours).toBe(111);
  });
  test('Return 404 when edit with wrong id', async () => {
    const response2 = await request(app).put('/timesheets/2222be8ffe1a69c4beb07aec').send({
      regularHours: 111,
      overtimeHours: 222,
      rate: 333,
    });
    expect(response2.statusCode).toBe(404);
  });
});
