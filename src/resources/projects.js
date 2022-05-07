const express = require('express');
const projects = require('../data/projects.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(projects);
});

router.get('/getById/:projectID', (req, res) => {
  const findProject = req.params.projectID;
  const projectFound = projects.find((project) => project.projectID === findProject);
  if (projectFound) {
    res.send(projectFound);
  } else {
    res.send('Project not found');
  }
});

// router.delete('/')

router.get('/getByName/:projectName', (req, res) => {
  const nameProject = req.params.projectName;
  const projectNamed = projects.filter((project) => project.projectName === nameProject);
  if (projectNamed.length > 0) {
    res.send(projectNamed);
  } else {
    res.send(`There is no project with "${nameProject}" name`);
  }
});

router.get('/getByHours/:totalHours', (req, res) => {
  const hoursProject = req.params.totalHours;
  const projectTime = projects.filter((project) => project.totalHours === hoursProject);
  if (projectTime.length > 0) {
    res.send(projectTime);
  } else {
    res.send(`There is no project with "${hoursProject}" hours`);
  }
});

router.get('/getByDescription/:projectDescription', (req, res) => {
  const descProject = req.params.projectDescription;
  const projectDescribed = projects.filter((project) => project.projectDescription === descProject);
  if (projectDescribed.length > 0) {
    res.send(projectDescribed);
  } else {
    res.send(`There is no project with "${descProject}" description`);
  }
});

router.get('/getByDate/:startDate', (req, res) => {
  const startProject = req.params.startDate;
  const projectStarted = projects.filter((project) => project.startDate === startProject);
  if (projectStarted.length > 0) {
    res.send(projectStarted);
  } else {
    res.send(`There is no projects launched on "${startProject}" `);
  }
});

router.get('/getByFinishDate/:finishDate', (req, res) => {
  const finishProject = req.params.finishDate;
  const projectFinished = projects.filter((project) => project.finishDate === finishProject);
  if (projectFinished.length > 0) {
    res.send(projectFinished);
  } else {
    res.send(`There is no projects ended on "${finishProject}" `);
  }
});

router.get('/getByRate/:rate', (req, res) => {
  const rateProject = req.params.rate;
  const projectRated = projects.filter((project) => project.rate === rateProject);
  if (projectRated.length > 0) {
    res.send(projectRated);
  } else {
    res.send(`There is no projects with a rate equal to "${rateProject}hs"`);
  }
});

router.get('/getByProjectManagerId/:projectManagerID', (req, res) => {
  const managerIdP = req.params.projectManagerID;
  const projectManager = projects.filter((project) => project.projectManagerID === managerIdP);
  if (projectManager.length > 0) {
    res.send(projectManager);
  } else {
    res.send(`There is no projects with a manager with the ID number "${managerIdP}"`);
  }
});

module.exports = router;
