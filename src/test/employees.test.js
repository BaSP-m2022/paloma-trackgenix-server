import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';

let employeesID;
beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});
describe('GET /employees', () => {
  test('The response should return a 200 code status', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
  });
  test('It should return the correct message', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.message).toBe('Showing the complete list of employees.');
  });
  test('It should return at least one employee', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('It should return error', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.error).toBe(false);
  });
//   test('It should return error', async () => {
//     const response = await request(app).get('/employees').send();
//     expect(response.body.message).toBe('There was an error');
//   });
});

describe('POST /employees', () => {
  test('It should return a status code 201', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.status).toBe(201);
    employeesID = '62342225b57ca6d7459809e3';
  });
  test('It should return a status code 400 because the assignedTask is empty', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'jperez@mail.com',
      password: 'contraseña123',
      assignedRole: 'QA',
      assignedTask: '',
    });
    expect(response.status).toBe(400);
  });
  test('It should return a 400 status code message', async () => {
    const response = await request(app).post('/employees').send();
    expect(response.status).toBe(400);
  });

  test('It should return an error because the name is empty', async () => {
    const response = await request(app).post('/employees').send({
      name: '',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because the name has lees than 3 letter', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Ju',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because the lastname has lees than 3 letter', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gi',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because the name is a number', async () => {
    const response = await request(app).post('/employees').send({
      name: 12234445,
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because the lastname is a number', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 456987,
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because the lastname is empty', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: '',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because the name is wrong', async () => {
    const response = await request(app).post('/employees').send({
      name: true,
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because the lastName is wrong', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: true,
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should return an error because the email is wrong (without @)', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasdsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because the email is wrong (without .com and @)', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasdsdas',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should return an error because the password has less than 6 c.', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: '1234',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because the password is empty', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: '',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because the password is not string', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 4444444556,
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because the password is wrong', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: true,
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should return an error because "assignedRole" is wrong', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEVELOPER',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because "assignedRole" is empty', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: '',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because "assignedRole" is wrong', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: true,
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because "assignedTask" is wrong', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: false,
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because "assignedTask" is empty', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: '',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should return an error because "assignedTask" is not string', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 554645656,
    });
    expect(response.statusCode).toBe(400);
  });
});
describe('Put /employees/edit', () => {
  test('It should return the status code 200', async () => {
    const response = await request(app).put(`/employees/${employeesID}`).send({
      name: 'Juan',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(200);
  });
  test('It should return the status code 400 because the name is empty', async () => {
    const response = await request(app).put('/employees/62342225b57ca6d7459809e3').send({
      name: '',
      lastname: 'Gimenez',
      email: 'asdasd@adfsdas.com',
      password: 'password123',
      assignedRole: 'DEV',
      assignedTask: 'asdd',
    });
    expect(response.statusCode).toBe(400);
  });
});
describe('GetById /employees', () => {
  test('It should return an employees with the mentioned ID', async () => {
    // eslint-disable-next-line no-undef
    const response = await request(app).get(`/employees/${employeesID}`).send();
    expect(response.status).toBe(200);
  });

  test('It should return a error status code message because the ID does not exist', async () => {
    const response = await request(app).get('/employees/5jhjhbjbu').send();
    expect(response.status).not.toBe(200);
  });
  //
  test('It should return the error message', async () => {
    const response = await request(app).get('/employees//').send();
    expect(response.status).toBe(404);
  });

  test('The error should be true', async () => {
    const response = await request(app).get('/employees/6').send();
    expect(response.body.error).toBeTruthy();
  });
  //
  test('The error should be false', async () => {
    // eslint-disable-next-line no-undef
    const response = await request(app).get(`/employees/${employeesID}`).send();
    expect(response.body.error).toBeFalsy();
  });
});
describe('Delete /employees', () => {
  test('It should return a status code 200, the message should be "Deleted employees!" and the error false', async () => {
    const response = await request(app).delete(`/employees/${employeesID}`).send();
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Employee succesfully Deleted!');
    expect(response.body.error).toBeFalsy();
  });

  test('The message should be "The employee was not found!" because it was deleted previously', async () => {
    const response = await request(app).delete(`/employees/${employeesID}`).send();
    expect(response.body.msg).toBe('The Employee has not been found');
  });

  test('It should return a status code 404 because the employee was not found', async () => {
    const response = await request(app).delete(`/employees/${employeesID}`).send();
    expect(response.status).toBe(404);
  });

  test('It should return true error', async () => {
    const response = await request(app).delete(`/employees/${employeesID}`).send();
    expect(response.body.error).toBeTruthy();
  });
});
