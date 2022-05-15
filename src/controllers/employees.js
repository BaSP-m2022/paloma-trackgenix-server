// eslint-disable-next-line import/no-import-module-exports
import Employees from '../models/Employees';

// const express = require('express');

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employees.find({});
    return res.status(200).json(allEmployees);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'There was an error',
    });
  }
};

const getEmployeesById = async (req, res) => {
  try {
    if (req.params.id) {
      const employee = await Employees.findById(req.params.id);
      return res.status(200).json(employee);
    } return res.status(400).json({
      message: 'There is no such Id',
    });
  } catch (error) {
    return res.json({
      message: 'Error',
    });
  }
};

const createEmployees = async (req, res) => {
  try {
    const employee = new Employees({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      assignedRole: req.body.assignedRole,
      assignedTask: req.body.assignedTask,
    });

    const result = await employee.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({ message: 'There was an error saving the employee' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
      });
    }
    const result = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'The employee has not been found',
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
const deleteEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await Employees.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The super admin has not been found',
      });
    }
    return res.status(200).json({
      msg: 'Employee succesfully Deleted!',
    });
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
    });
  }
};

export default {
  getAllEmployees,
  getEmployeesById,
  createEmployees,
  updateEmployee,
  deleteEmployee,
};
// module.exports = employeesController;

/*
const fs = require('fs');
const employees = require('../data/employees.json');

const employeesRouter = express.Router();

employeesRouter.get('/:id', (req, res) => {
  const userID = req.params.id;
  const user = employees.find((employee) => employee.id === userID);
  if (user) {
    res.send(user);
  } else { res.send('User not found'); }
});

employeesRouter.delete('/:id', (req, res) => {
  const employeeId = req.params.id;
  const filteredEmp = employees.filter(
    (employee) => employee.id !== employeeId,
  );
  if (employees.length === filteredEmp.length) {
    res.send('Could not delete employee because it was not found');
  } else {
    fs.writeFile(
      'src/data/employees.json',
      JSON.stringify(filteredEmp),
      (err) => {
        if (err) {
          res.send(err);
        } else { res.send('Employee deleted'); }
      },
    );
  }
});

// edit employee

employeesRouter.put('/:id', (req, res) => {
  let userID = req.params.id;
  const jsonData = fs.readFileSync('src/data/employees.json');
  const data = JSON.parse(jsonData);
  const filterID = employees.find((employee) => employee.id === userID);
  if (filterID) {
    userID -= 1;
    data[userID].name = req.body.name;
    data[userID].lastName = req.body.lastName;
    data[userID].email = req.body.email;
    data[userID].password = req.body.password;
    data[userID].role = req.body.role;
    data[userID].task = req.body.task;
    fs.writeFileSync('src/data/employees.json', JSON.stringify(data));
    res.json(data);
  } else { res.send('User not found'); }
});

employeesRouter.get('/', (req, res) => {
  res.send(employees);
});

employeesRouter.get('/:role', (req, res) => {
  const userRole = req.params.role;
  const filteredUsers = employees.filter(
    (employee) => employee.role === userRole,
  );
  if (filteredUsers.length > 0) {
    res.send(filteredUsers);
  } else {
    res.send(`There are no ${userRole} users`);
  }
});

employeesRouter.post('/', (req, res) => {
  const employeeData = req.body;
  const user = employees.find((employee) => employee.id === employeeData.id);
  if (employeeData.id && employeeData.name && employeeData.lastName
     && employeeData.email && employeeData.password && employeeData.role
     && employeeData.task && !user) {
    employees.push(employeeData);
    fs.writeFile(
      'src/data/employees.json',
      JSON.stringify(employees),
      (error) => {
        if (error) {
          res.send(error);
        } else {
          res.send('User registered');
        }
      },
    );
  } else {
    res.send('Must have all fields completed and the id must be unique');
  }
});

module.exports = employeesRouter;
*/
