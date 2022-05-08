const express = require('express');
const fs = require('fs');
const timesheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(timesheets);
});

router.get('/getByTimesheet/:id', (req, res) => {
  const timesheetID = req.params.id;
  const user = timesheets.find((timesheet) => timesheet.id === timesheetID);

  if (user) {
    res.send(user);
  } else {
    res.send(`Timesheet ${timesheetID} not found`);
  }
});

router.get('/getByRole/:role', (req, res) => {
  const userRol = req.params.role;
  const user = timesheets.filter((timesheet) => timesheet.role === userRol);

  if (user) {
    res.send(user);
  } else {
    res.send(`Users with ${userRol} rol not found`);
  }
});

router.get('/getByProject/:project', (req, res) => {
  const { project } = req.params;
  const allProject = timesheets.filter((timesheet) => timesheet.project === project);

  if (allProject) {
    res.send(allProject);
  } else {
    res.send(`Project ${project} not found`);
  }
});

router.get('/getByEmployeeID/:employeeID', (req, res) => {
  const employee = req.params.employeeID;
  const filterID = timesheets.find((timesheet) => timesheet.employeeID === employee);

  if (filterID) {
    res.send(filterID);
  } else {
    res.send(`User ${employee} not found`);
  }
});

router.post('/Add', (req, res) => {
  const timesheetData = req.body;
  timesheets.push(timesheetData);
  fs.writeFile('./src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Timesheet added');
    }
  });
});

router.delete('/delete/:id', (req, res) => {
  const timesheetID = req.params.id;
  const filteredID = timesheets.filter(
    (ts) => ts.id !== timesheetID,
  );
  if (timesheets.length === filteredID.length) {
    res.send(`Timsheet ${timesheetID} not found`);
  } else {
    fs.writeFile(
      'src/data/time-sheets.json',
      JSON.stringify(filteredID),
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('timesheet deleted');
        }
      },
    );
  }
});

router.put('/edit/:id', (req, res) => {
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
    fs.writeFileSync('src/data/time-sheets.json', JSON.stringify(data));
    res.json(data);
  } else {
    res.send('User not found');
  }
});

module.exports = router;
