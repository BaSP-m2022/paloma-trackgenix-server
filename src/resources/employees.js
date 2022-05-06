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
router.get('/getByRole/:role', (req, res) => {
  const userRol = req.params.role;
  const user = employees.find((employee) => employee.role === userRol);

  if (user) {
    res.send(user);
  } else {
    res.send('User not found');
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
module.exports = router;
