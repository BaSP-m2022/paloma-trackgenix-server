const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const employeesRouter = express.Router();

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
     && employeeData.role && employeeData.task && !user) {
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
  } else { res.send('Must have all fields completed and the id must be unique'); }
});

module.exports = employeesRouter;
