const express = require('express');
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

module.exports = employeesRouter;
