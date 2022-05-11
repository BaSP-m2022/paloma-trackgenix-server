// use "import" to import libraries
// import express from 'express';

// use "require" to import JSON files
const express = require('express');
const admins = require('./data/admins.json');
const projectRouter = require('./resources/projects');
const projectEmployeeRouter = require('./resources/projects-employees');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/projects', projectRouter);
app.use('/project/employee', projectEmployeeRouter);

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
