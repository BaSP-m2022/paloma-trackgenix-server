const express = require('express');
const fs = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(projects);
});

router.post('/', (req, res) => {
  const projectData = req.body;
  if (projectData.projectID && projectData.projectName && projectData.totalHours
    && projectData.projectDescription && projectData.startDate && projectData.finishDate
    && projectData.rate && projectData.employeeID && projectData.role && projectData.status) {
    projects.push(projectData);
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project created');
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const id = req.params.id - 1;

  const jsonData = fs.readFileSync('src/data/projects.json');
  const data = JSON.parse(jsonData);

  data[id].projectName = req.body.projectName;
  data[id].totalHours = req.body.totalHours;
  data[id].projectDescription = req.body.projectDescription;
  data[id].startDate = req.body.startDate;
  data[id].finishDate = req.body.finishDate;
  data[id].rate = req.body.rate;
  data[id].employeeID = req.body.employeeID;
  data[id].role = req.body.role;
  data[id].status = req.body.status;

  fs.writeFileSync('src/data/projects.json', JSON.stringify(data, null, 2));
  res.json(data);
});

router.patch('/employee/:id', (req, res) => {
  const id = req.params.id - 1;

  const jsonData = fs.readFileSync('src/data/projects.json');
  const data = JSON.parse(jsonData);

  data[id].employeeID = req.body.employeeID;
  data[id].role = req.body.role;

  fs.writeFileSync('src/data/projects.json', JSON.stringify(data, null, 2));
  res.json(data);
});

module.exports = router;
