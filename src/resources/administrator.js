// Calling exrpess.
const express = require('express');
// File System (library).
const fs = require('fs');
// Array of admins.
const administrators = require('../data/admins.json');
// Defining Router
const router = express.Router();
// gets all data in Json file
router.get('/getAll', (req, res) => {
  res.send(administrators);
});
// gets one admin by its id when find is used it only finds the 1st one
router.get('/getById/:id', (req, res) => {
  const adminId = req.params.id;
  const administrator = administrators.find((eachAdm) => eachAdm.id === adminId);
  if (administrator) {
    res.send(administrator);
  } else {
    res.send('Admin not found');
  }
});
// filter list by gender
router.get('/getByGender/:gender', (req, res) => {
  const adminGender = req.params.gender;
  const filteredAdmins = administrators.filter((eachAdm) => eachAdm.gender === adminGender);
  if (filteredAdmins.length > 0) {
    res.send(filteredAdmins);
  } else {
    res.send(`There are no ${adminGender} Admins`);
  }
});
// filter list by Status active
router.get('/getByStatus/:status', (req, res) => {
  const adminStatus = req.params.status;
  const filteredAdmins = administrators.filter((eachAdm) => eachAdm.status === adminStatus);
  if (filteredAdmins) {
    res.send(filteredAdmins);
  } else {
    res.send('There are no active Admins');
  }
});
// Creation of a new admin.
router.post('/add', (req, res) => {
  const adminData = req.body;
  /* Validation in process, will be completed after finishing the exercise
   if (!adminData.id || !adminData.name || !adminData.lastName
    || !adminData.email || !adminData.gender || !adminData.status) {
    alert('All the fields must be completed');
  } */
  administrators.push(adminData);
  fs.writeFile('src/data/admins.json', JSON.stringify(administrators), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('User created');
    }
  });
});

module.exports = router;
