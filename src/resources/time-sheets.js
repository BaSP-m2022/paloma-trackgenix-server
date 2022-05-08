const express = require('express');
const res = require('express/lib/response');
const timesheet = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(timesheet);
});

router.get('/getByTimesheet/:id', (req, res) => {
  const timesheetID = req.params.id;
  const user = timesheet.find((timesheet) => timesheet.id === timesheetID);

  if (user) {
    res.send(user);
  } else {
    res.send('User not found');
  }
});

router.get('/getByRole/:role', (req, res) => {
  const userRol = req.params.role;
  const user = timesheet.filter((timesheet) => timesheet.role === userRol);

  if (user) {
    res.send(user);
  } else {
    res.send('User not found');
  }
});

router.get('/getByProject/:project', (req, res) => {
  const { project } = req.params;
  const allProject = timesheet.filter((timesheet) => timesheet.project === project);

  if (allProject) {
    res.send(allProject);
  } else {
    res.send('Project not found');
  }
});

router.get('/getByEmployeeID/:employeeID', (req, res) => {
  const employee = req.params.employeeID;
  const filterID = timesheet.find((timesheet) => timesheet.employeeID === employee);

  if (filterID) {
    res.send(filterID);
  } else {
    res.send('User not found');
  }
});

module.exports = router;
