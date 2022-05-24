import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeed from '../seeds/tasks';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
});
let tasksID;
describe('GET /tasks', () => {
  test('The response should return a 200 code status', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.error).toBe(true);
  });
});

describe('POST /tasks', () => {
  test('should create an employee', async () => {
    const response = await request(app).post('/tasks').send(
      {
        taskName: 'Use of CSS in HTML',
        taskDescription: 'Use CSS to stylish the page',
        status: 'Finished',
        employeeID: 2,
      },
    );
    expect(response.status).toBe(201);
    tasksID = response.body._id;
  });

  test('should not create an employee', async () => {
    const response = await request(app).post('/tasks').send();
    expect(response.status).toBe(400);
  });

  test('should not create an employee(missing taskName)', async () => {
    const response = await request(app).post('/tasks').send(
      {
        taskDescription: 'Use CSS to stylish the page',
        status: 'Finished',
        employeeID: 2,
      },
    );
    expect(response.status).toBe(400);
  });

  test('should not create an employee(missing taskDescription)', async () => {
    const response = await request(app).post('/tasks').send(
      {
        taskName: 'Use of CSS in HTML',
        status: 'Finished',
        employeeID: 2,
      },
    );
    expect(response.status).toBe(400);
  });

  test('should not create an employee(missing status)', async () => {
    const response = await request(app).post('/tasks').send(
      {
        taskName: 'Use of CSS in HTML',
        taskDescription: 'Use CSS to stylish the page',
        employeeID: 2,
      },
    );
    expect(response.status).toBe(400);
  });
});

describe('GET /tasks:id', () => {
  test('The response should return a 200 code status', async () => {
    const response = await request(app).get(`/tasks/${tasksID}`).send();
    expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get(`/tasks/${tasksID}`).send();
    expect(response.error).toBe(true);
  });
});

describe('PUT /tasks:id', () => {
  test('should edit a task', async () => {
    const response = await request(app).put(`/tasks/${tasksID}`).send({
      taskName: 'Creation of index',
      taskDescription: 'Use CSS to stylish the page',
    });
    expect(response.status).toBe(200);
  });
  test('should edit a task (without taskDescription)', async () => {
    const response = await request(app).put(`/tasks/${tasksID}`).send({
      taskName: 'Use of mediaqueries',
      status: 'Finished',
      employeeID: 5,
    });
    expect(response.status).toBe(200);
  });
  test('should edit a task (without Status)', async () => {
    const response = await request(app).put(`/tasks/${tasksID}`).send({
      taskName: 'Use of mediaqueries',
      taskDescription: 'Use CSS to stylish the page',
      employeeID: 5,
    });
    expect(response.status).toBe(200);
  });
  test('should edit a task (without employeeID)', async () => {
    const response = await request(app).put(`/tasks/${tasksID}`).send({
      taskName: 'Use of mediaqueries',
      taskDescription: 'Use CSS to stylish the page',
      status: 'Finished',
    });
    expect(response.status).toBe(200);
  });
  test('response should return a false error', async () => {
    const response = await request(app).get(`/tasks/${tasksID}`).send({
      taskName: 'Use of mediaqueries',
      taskDescription: 'Use CSS to stylish the page',
      status: 'Finished',
    });
    expect(response.error).toBe(true);
  });
});

describe('DELETE /tasks:id', () => {
  test('should delete a task', async () => {
    const response = await request(app).delete(`/tasks/${tasksID}`).send();
    expect(response.status).toEqual(200);
  });
  test('status should be 404', async () => {
    const response = await request(app).delete('/tasks/').send();
    expect(response.status).toEqual(404);
  });
});
