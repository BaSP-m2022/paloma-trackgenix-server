const express = require('express');
const fs = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(projects);
});

router.get('/Id/:projectID', (req, res) => {
  const findProject = req.params.projectID;
  const projectFound = projects.find((project) => project.projectID === findProject);
  if (projectFound) {
    res.send(projectFound);
  } else {
    res.send('Project not found');
  }
});

router.delete('/delete/:projectID', (req, res) => {
  const projectId = req.params.projectID;
  const filteredProject = projects.filter((project) => project.projectID !== projectId);
  if (projects.length === filteredProject.length) {
    res.send('Could not delete the project because it was not found');
  } else {
    fs.writeFile('src/data/projects.json', JSON.stringify(filteredProject), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('User deleted');
      }
    });
  }
});

router.get('/Name/:projectName', (req, res) => {
  const nameProject = req.params.projectName;
  const projectNamed = projects.filter((project) => project.projectName === nameProject);
  if (projectNamed.length > 0) {
    res.send(projectNamed);
  } else {
    res.send(`There is no project with "${nameProject}" name`);
  }
});

router.get('/Hours/:totalHours', (req, res) => {
  const hoursProject = req.params.totalHours;
  const projectTime = projects.filter((project) => project.totalHours === hoursProject);
  if (projectTime.length > 0) {
    res.send(projectTime);
  } else {
    res.send(`There is no project with "${hoursProject}" hours`);
  }
});

router.get('/Start-Date/:startDate', (req, res) => {
  const startProject = req.params.startDate;
  const projectStarted = projects.filter((project) => project.startDate === startProject);
  if (projectStarted.length > 0) {
    res.send(projectStarted);
  } else {
    res.send(`There is no projects launched on "${startProject}" `);
  }
});

router.get('/Finish-Date/:finishDate', (req, res) => {
  const finishProject = req.params.finishDate;
  const projectFinished = projects.filter((project) => project.finishDate === finishProject);
  if (projectFinished.length > 0) {
    res.send(projectFinished);
  } else {
    res.send(`There is no projects ended on "${finishProject}" `);
  }
});

router.get('/Rate/:rate', (req, res) => {
  const rateProject = req.params.rate;
  const projectRated = projects.filter((project) => project.rate === rateProject);
  if (projectRated.length > 0) {
    res.send(projectRated);
  } else {
    res.send(`There is no projects with a rate equal to "${rateProject}hs"`);
  }
});

router.get('/EmployeeId/:employeeID', (req, res) => {
  const employeeIdP = req.params.employeeID;
  const projectEmployee = projects.filter((project) => project.employeeID === employeeIdP);
  if (projectEmployee.length > 0) {
    res.send(projectEmployee);
  } else {
    res.send(`There is no projects with a Employee with the ID number "${employeeIdP}"`);
  }
});

router.get('/Role/:role', (req, res) => {
  const roleProject = req.params.role;
  const projectRole = projects.filter((project) => project.role === roleProject);
  if (projectRole.length > 0) {
    res.send(projectRole);
  } else {
    res.send(`There is no projects with the "${roleProject}" state`);
  }
});

router.get('/State/:state', (req, res) => {
  const stateProject = req.params.state;
  const projectState = projects.filter((project) => project.state === stateProject);
  if (projectState.length > 0) {
    res.send(projectState);
  } else {
    res.send(`There is no projects with the "${stateProject}" state`);
  }
});

module.exports = router;
