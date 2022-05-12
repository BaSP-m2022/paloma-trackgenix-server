// use "import" to import libraries

// use "require" to import JSON files
const express = require('express');

const admins = require('./data/admins.json');

const superAdmins = require('./data/super-admins.json');

const superAdminRouter = require('./resources/super-admins');

const projectEmployeeRouter = require('./resources/projects-employees');

const sheetRouter = require('./resources/time-sheets');

const employeesRouter = require('./resources/employees');

const projectsRouter = require('./resources/projects');

const tasksRouter = require('./resources/tasks');

const adminsRouter = require('./resources/administrator');

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

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.use('/employees', employeesRouter);

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});
app.get('/super-admins', (req, res) => {
  res.status(200).json({

    data: superAdmins,

  });
});

app.use('/employees', employeesRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
