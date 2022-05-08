const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(employees);
});
router.get('/getById/:id', (req, res) => {
  const userID = req.params.id;
  const user = employees.find((employee) => employee.id === userID);

  if (user) {
    res.send(user);
  } else {
    res.send('User not found');
  }
});

router.get('/getByRole/:role', (req, res) => {
  const userRole = req.params.role;
  const filteredUsers = employees.filter(
    (employee) => employee.role === userRole
  );
  if (filteredUsers.length > 0) {
    res.send(filteredUsers);
  } else {
    res.send(`There are no ${userRole} users`);
  }
});
router.delete('/delete/:id', (req, res) => {
  const employeeId = req.params.id;
  const filteredEmp = employees.filter(
    (employee) => employee.id !== employeeId
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
        } else {
          res.send('Employee deleted');
        }
      }
    );
  }
});

router.post('/add', (req, res) => {
  const userData = req.body;
  employees.push(userData);
  fs.writeFile(
    'src/data/employees.json',
    JSON.stringify(employees),
    (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send('User created');
      }
    }
  );

  res.send('OKa');
});

// const fileName = './file.json';
// const employee = require(employees);

// employees.key = 'new value';

// fs.writeFile(employees, JSON.stringify(employee), (err) => {
//   if (err) return console.log(err);
//   console.log(JSON.stringify(employee));
//   console.log(`writing to ${employees}`);
// });
module.exports = router;
