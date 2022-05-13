// use "import" to import libraries
// import mongoose from 'mongoose';
// use "require" to import JSON files
// const mongoDBURL = 'mongodb+srv://cluster0.caoft.mongodb.net/BaSP-database?appName=mongosh+1.3.1';

// const { default: mongoose } = require('mongoose');

// mongoose.connect(mongoDBURL, () => {
//   console.log('Connected to the database');
// }, (error) => console.log(`Failed to connect to the database ${error}`));

const express = require('express');

const admins = require('./data/admins.json');

const superAdminRouter = require('./controllers/super-admins');

const projectEmployeeRouter = require('./controllers/projects-employees');

const sheetRouter = require('./controllers/time-sheets');

const employeesRouter = require('./controllers/employees');

const projectsRouter = require('./controllers/projects');

const tasksRouter = require('./controllers/tasks');

const adminsRouter = require('./controllers/administrator');

const app = express();

const port = process.env.PORT || 3000;

// With this line and the body parser the server can obtain info from postman
app.use(express.json());

app.use('/super-admins', superAdminRouter);

app.use('/project/employee', projectEmployeeRouter);

app.use('/timesheets', sheetRouter);

app.use('/projects', projectsRouter);

app.use('/tasks', tasksRouter);

app.use('/administrator', adminsRouter);

app.use('/employees', employeesRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
