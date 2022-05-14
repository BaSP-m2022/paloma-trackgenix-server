const express = require('express');
const fs = require('fs');
const timesheets = require('../models/Timesheets');

const timesheetRouter = express.Router();

timesheetRouter.get('/', (req, res) => {
  res.send(timesheets);
});

timesheetRouter.get('/:id', (req, res) => {
  const timesheetID = req.params.id;
  const user = timesheets.find((timesheet) => timesheet.id === timesheetID);

  if (user) {
    res.send(user);
  } else {
    res.send(`Timesheet ${timesheetID} not found`);
  }
});

timesheetRouter.get('/role/:role', (req, res) => {
  const userRol = req.params.role;
  const user = timesheets.filter((timesheet) => timesheet.role === userRol);

  if (user.length > 0) {
    res.send(user);
  } else {
    res.send(`Users with ${userRol} rol not found`);
  }
});

timesheetRouter.get('/project/:project', (req, res) => {
  const { project } = req.params;
  const allProject = timesheets.filter((timesheet) => timesheet.project === project);

  if (allProject.length > 0) {
    res.send(allProject);
  } else {
    res.send(`Project ${project} not found`);
  }
});

timesheetRouter.get('/employee/:employeeID', (req, res) => {
  const employee = req.params.employeeID;
  const filterID = timesheets.find((timesheet) => timesheet.employeeID === employee);

  if (filterID) {
    res.send(filterID);
  } else {
    res.send(`User ${employee} not found`);
  }
});

timesheetRouter.post('/', (req, res) => {
  const timesheetData = req.body;
  const filterID = timesheets.find((timesheet) => timesheet.id === timesheetData.id);
  timesheets.push(timesheetData);
  if (timesheetData.employeeID && timesheetData.id && timesheetData.name && timesheetData.surname
    && timesheetData.role && timesheetData.startDate && timesheetData.finishDate
    && timesheetData.regularHours && timesheetData.overtimeHours
    && timesheetData.rate && timesheetData.project && timesheetData.task && !filterID) {
    // fs.writeFile('./src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.send('Timesheet added');
    //   }
    // });
  } else {
    res.send('Incorrect data');
  }
});

timesheetRouter.delete('/:id', (req, res) => {
  const timesheetID = req.params.id;
  const filteredID = timesheets.filter(
    (ts) => ts.id !== timesheetID,
  );
  if (timesheets.length === filteredID.length) {
    res.send(`Timsheet ${timesheetID} not found`);
  } else {
    // fs.writeFile(
    //   'src/data/time-sheets.json',
    //   JSON.stringify(filteredID),
    //   (err) => {
    //     if (err) {
    //       res.send(err);
    //     } else {
    //       res.send('timesheet deleted');
    //     }
    //   },
    // );
  }
});

timesheetRouter.put('/edit/:id', (req, res) => {
  let userID = req.params.id;
  const jsonData = fs.readFileSync('src/data/time-sheets.json');
  const data = JSON.parse(jsonData);
  const filterID = timesheets.find((timesheet) => timesheet.id === userID);
  if (filterID) {
    userID -= 1;
    data[userID].employeeID = req.body.employeeID;
    data[userID].name = req.body.name;
    data[userID].surname = req.body.surname;
    data[userID].role = req.body.role;
    data[userID].startDate = req.body.startDate;
    data[userID].finishDate = req.body.finishDate;
    data[userID].regularHours = req.body.regularHours;
    data[userID].overtimeHours = req.body.overtimeHours;
    data[userID].rate = req.body.rate;
    data[userID].project = req.body.project;
    data[userID].task = req.body.task;
    // fs.writeFileSync('src/data/time-sheets.json', JSON.stringify(data));
    // res.json(data);
  } else {
    res.send('User not found');
  }
});

module.exports = timesheetRouter;
