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

  test('It should return an error because the name is wrong', async () => {
    const response = await request(app).post('/admin').send({
      name: 'a',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should return an error because the lastName is wrong', async () => {
    const response = await request(app).post('/admin').send({
      name: 'juan',
      lastName: 'a',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should return an error because the email is wrong', async () => {
    const response = await request(app).post('/admin').send({
      name: 'juan',
      lastName: 'perez',
      email: 'a',
      gender: 'male',
      active: true,
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should return an error because the gender is wrong', async () => {
    const response = await request(app).post('/admin').send({
      name: 'juan',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'a',
      active: true,
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should return an error because "active" should be true or false', async () => {
    const response = await request(app).post('/admin').send({
      name: 'juan',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'male',
      active: 'a',
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('GetById /admins', () => {
  test('It should return an admin with the mentioned ID', async () => {
    const response = await request(app).get('/admin/628ae081dbe588f5677e9982').send();
    expect(response.statusCode).toBe(200);
  });

  test('It should return a 404 status code message because the ID does not exist', async () => {
    const response = await request(app).get('/admin/628ae081dbe588f5677e9987').send();
    expect(response.statusCode).toBe(404);
  });

  test('It should return the error message', async () => {
    const response = await request(app).get('/admin/628ae081dbe588f5677e9987').send();
    expect(response.body.message).toBe('ID not found');
  });

  test('The error should be false', async () => {
    const response = await request(app).get('/admin/628ae081dbe588f5677e9982').send();
    expect(response.body.error).toBeFalsy();
  });

  test('The error should be false', async () => {
    const response = await request(app).get('/admin/628ae081dbe588f5677e9987').send();
    expect(response.body.error).toBeTruthy();
  });
});

describe('Put /admins/edit', () => {
  test('It should return the status code 200', async () => {
    const response = await request(app).put('/admin/628ae081dbe588f5677e9982').send({
      name: 'juan',
      lastName: 'pereza',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.statusCode).toBe(200);
  });

  test('It should return the status code 400 because the lastName is empty', async () => {
    const response = await request(app).put('/admin/628ae081dbe588f5677e9982').send({
      name: 'juan',
      lastName: '',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should return the status code 404 because the ID is wrong', async () => {
    const response = await request(app).put('/admin/628ae081dbe588f5677e9987').send({
      name: 'juan',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.statusCode).toBe(404);
  });

  test('It should return the error message because the ID is wrong', async () => {
    const response = await request(app).put('/admin/628ae081dbe588f5677e9987').send({
      name: 'juan',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.body.message).toBe('The admin was not found');
  });

  test('It should return undefined in the data message because the ID is wrong', async () => {
    const response = await request(app).put('/admin/628ae081dbe588f5677e9987').send({
      name: 'juan',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.data).toBe(undefined);
  });

  test('The error should be false', async () => {
    const response = await request(app).put('/admin/628ae081dbe588f5677e9982').send({
      name: 'juan',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.body.error).toBeFalsy();
  });

  test('The error should be false', async () => {
    const response = await request(app).put('/admin/628ae081dbe588f5677e9987').send({
      name: 'juan',
      lastName: 'perez',
      email: 'jperez@mail.com',
      gender: 'male',
      active: true,
    });
    expect(response.body.error).toBeTruthy();
  });
});

describe('Delete /admin', () => {
  test('It should return a status code 200, the message should be "Deleted admin!" and the error false', async () => {
    const response = await request(app).delete('/admin/628281b30f0ab1495571e1a4').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toBe('Deleted admin!');
    expect(response.body.error).toBeFalsy();
  });

  test('The message should be "The admin was not found!" because it was deleted previously', async () => {
    const response = await request(app).delete('/admin/628281b30f0ab1495571e1a4').send();
    expect(response.body.msg).toBe('The admin was not found');
  });

  test('It should return a status code 404 because the admin was not found', async () => {
    const response = await request(app).delete('/admin/628281b30f0ab1495571e1a4').send();
    expect(response.statusCode).toBe(404);
  });

  test('It should return true error', async () => {
    const response = await request(app).delete('/admin/628281b30f0ab1495571e1a4').send();
    expect(response.body.error).toBeTruthy();
  });
});
