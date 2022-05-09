const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(employees);
});

router.get('/getById/:id', (req, res) => {
  const employeeId = req.params.id;
  const emp = employees.find((employee) => employee.id === employeeId);
  if (emp) {
    res.send(emp);
  } else {
    res.send(`Employee ${employeeId} not found`);
  }
});

router.get('/getByRole', (req, res) => {
  const employeeRole = req.query.role;
  const filteredEmp = employees.filter((employee) => employee.role === employeeRole);
  if (filteredEmp) {
    res.send(filteredEmp);
  } else {
    res.send(`There are no ${employeeRole} role`);
  }
});

router.post('/add', (req, res) => {
  const employeeData = req.body;
  const emp = employees.find((employee) => employee.id === employeeData.id);
  if (employeeData.id && employeeData.name && employeeData.lastName && employeeData.email
    && employeeData.password && employeeData.role && !emp) {
    employees.push(employeeData);
    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee created');
      }
    });
  } else {
    res.send('All fields must be completed and the id must be unique');
  }
});

router.put('/edit/:id', (req, res) => {
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
  } else {
    res.send('User not found');
  }
});

router.delete('/delete/:id', (req, res) => {
  const employeeId = req.params.id;
  const filteredEmp = employees.filter((employee) => employee.id !== employeeId);
  if (employees.length === filteredEmp.length) {
    res.send('Could not delete employee because it was not found');
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(filteredEmp), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee deleted');
      }
    });
  }
});

module.exports = router;
