// Calling exrpess.
const express = require('express');
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
module.exports = router;
