const express = require('express');
const tasks = require('../data/tasks.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(tasks);
});

router.get('/getById/:taskID', (req, res) => {
  const findTask = req.params.taskID;
  const taskFound = tasks.find((task) => task.taskID === findTask);
  if (taskFound) {
    res.send(taskFound);
  } else {
    res.send('Task not found');
  }
});

router.get('/getByName/:taskName', (req, res) => {
  const nameTask = req.params.taskName;
  const taskNamed = tasks.filter((task) => task.taskName === nameTask);
  if (taskNamed.length > 0) {
    res.send(taskNamed);
  } else {
    res.send(`There is no task with "${nameTask}" name`);
  }
});

router.get('/getByDescription/:taskDescription', (req, res) => {
  const descriptionTask = req.params.taskDescription;
  const descriptionOfTask = tasks.filter((task) => task.taskDescription === descriptionTask);
  if (descriptionOfTask.length > 0) {
    res.send(descriptionOfTask);
  } else {
    res.send(`There is no task with "${descriptionTask}" description`);
  }
});

router.get('/getByStatus/:status', (req, res) => {
  const taskStatus = req.params.status;
  const statusOfTask = tasks.filter((task) => task.status === taskStatus);
  if (statusOfTask.length > 0) {
    res.send(statusOfTask);
  } else {
    res.send(`There is no task with "${taskStatus}" status`);
  }
});

router.get('/getByEmployeeID/:employeeID', (req, res) => {
  const emplId = req.params.employeeID;
  const idOfEmployee = tasks.filter((task) => task.employeeID === emplId);
  if (idOfEmployee.length > 0) {
    res.send(idOfEmployee);
  } else {
    res.send(`There is no employee with ID number "${emplId}"`);
  }
});

module.exports = router;
