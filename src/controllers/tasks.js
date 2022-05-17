// import models from '../models';

const models = require('../models');

// const express = require('express');

// const router = express.Router();

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await models.Tasks.find({});
    return res.status(200).json(allTasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error',
    });
  }
};

const getTaskByID = async (req, res) => {
  if (req.params.id) {
    const task = await models.Tasks.findByID(req.params.id);
    return res.status(200).json(task);
  }
  return res.status(400).json({
    msg: 'Missing id parameter',
  });
};

const createTask = async (req, res) => {
  try {
    const task = new models.Task({
      taskID: req.params.taskID,
      taskName: req.params.taskName,
      taskDescription: req.params.taskDescription,
      status: req.params.status,
      employeeID: req.params.employeeID,
    });
    const result = await task.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'There was an error creating the task',
      error: error.details[0].message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await models.Tasks.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The task has not been found',
      });
    }
    return res.status(200).json({
      msg: 'Task Deleted!',
    });
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
    });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
      });
    }
    const result = await models.Tasks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'The task has not been found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      error: error.details[0].message,
    });
  }
};

const getTaskByName = async (req, res) => {
  if (req.params.taskName) {
    const task = await models.Tasks.findByID(req.params.taskName);
    return res.status(200).json(task);
  }

  return res.status(400).json({
    msg: 'Missing task name parameter',
  });
};

const getTaskByStatus = async (req, res) => {
  if (req.params.status) {
    const task = await models.Tasks.findByID(req.params.status);
    return res.status(200).json(task);
  }

  return res.status(400).json({
    msg: 'Missing status parameter',
  });
};

const getTaskByEmployeeID = async (req, res) => {
  if (req.params.employeeID) {
    const task = await models.Tasks.findByID(req.params.employeeID);
    return res.status(200).json(task);
  }

  return res.status(400).json({
    msg: 'Missing employee id parameter',
  });
};

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

module.exports = {
  getAllTasks,
  getTaskByID,
  createTask,
  deleteTask,
  updateTask,
  getTaskByEmployeeID,
  getTaskByStatus,
  getTaskByName,
};
