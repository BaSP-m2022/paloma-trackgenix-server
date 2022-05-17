const express = require('express');
const fs = require('fs');
const tasks = require('../data/tasks.json');

import models from '../models';

const router = express.Router();

const getAllTasks = async (req, res) => {
  const allTasks = await models.Tasks.find({});
  return res.status(200).json(allTasks);
}

const getTaskByID = async (req, res) => {
  if (req.params.id){
    const task = await models.Tasks.findByID(req.params.id);
    return res.status(200).json(task);
  }

  else{
    return res.status(400).json({
      msg: 'Missing id parameter'
    })
  }
  
}

const createTask = async (req, res) => {
  const task = new models.Task({
    taskID: req.params.taskID,
    taskName: req.params.taskName,
    taskDescription: req.params.taskDescription,
    status: req.params.status,
    employeeID: req.params.employeeID
  });

  const result = await task.save();
  return res.status(201).json(result);
}

const deleteTask = async (req, res) => {

}

// router.get('/', (req, res) => {
//   res.send(tasks);
// });

// router.get('/:taskID', (req, res) => {
//   const findTask = req.params.taskID;
//   const taskFound = tasks.find((task) => task.taskID === findTask);
//   if (taskFound) {
//     res.send(taskFound);
//   } else {
//     res.send('Task not found');
//   }
// });

// router.get('/taskName/:taskName', (req, res) => {
//   const nameTask = req.params.taskName;
//   const taskNamed = tasks.filter((task) => task.taskName === nameTask);
//   if (taskNamed.length > 0) {
//     res.send(taskNamed);
//   } else {
//     res.send(`There is no task with "${nameTask}" name`);
//   }
// });

// router.get('/status/:status', (req, res) => {
//   const taskStatus = req.params.status;
//   const statusOfTask = tasks.filter((task) => task.status === taskStatus);
//   if (statusOfTask.length > 0) {
//     res.send(statusOfTask);
//   } else {
//     res.send(`There is no task with "${taskStatus}" status`);
//   }
// });

// router.get('/employee/:employeeID', (req, res) => {
//   const emplId = req.params.employeeID;
//   const idOfEmployee = tasks.filter((task) => task.employeeID === emplId);
//   if (idOfEmployee.length > 0) {
//     res.send(idOfEmployee);
//   } else {
//     res.send(`There is no employee with ID number "${emplId}"`);
//   }
// });

// router.post('/', (req, res) => {
//   const taskData = req.body;
//   const taskFound = tasks.find((task) => task.taskID === taskData.taskID);
//   if (taskData.taskID && taskData.taskName && taskData.taskDescription
//     && taskData.status && taskData.employeeID && !taskFound) {
//     tasks.push(taskData);
//     fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send('Task created');
//       }
//     });
//   } else {
//     res.send('Fields are not properly complete');
//   }
// });

// router.delete('/:taskID', (req, res) => {
//   const tasksId = req.params.taskID;
//   const idOfTasks = tasks.filter((task) => task.taskID !== tasksId);
//   if (tasks.length === idOfTasks.length) {
//     res.send('This task could not be found');
//   } else {
//     fs.writeFile('src/data/tasks.json', JSON.stringify(idOfTasks), (err) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send('Task deleted');
//       }
//     });
//   }
// });

// router.put('/:taskID', (req, res) => {
//   let tasksId = req.params.taskID;
//   const jsonData = fs.readFileSync('src/data/tasks.json');
//   const data = JSON.parse(jsonData);
//   const filterTasks = tasks.find((task) => task.taskID === tasksId);
//   if (filterTasks) {
//     tasksId -= 1;
//     data[tasksId].taskName = req.body.taskName;
//     data[tasksId].taskDescription = req.body.taskDescription;
//     data[tasksId].status = req.body.status;
//     data[tasksId].employeeID = req.body.employeeID;
//     fs.writeFileSync('src/data/tasks.json', JSON.stringify(data));
//     res.json(data);
//   } else {
//     res.send('Task not found');
//   }
// });

module.exports = router;
