const express = require('express');
const fs = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(projects);
});

router.post('/add', (req, res) => {
  const projectData = req.body;
  if (projectData.projectID && projectData.projectName && projectData.totalHours
    && projectData.projectDescription && projectData.startDate && projectData.Rate
    && projectData.projectManagerID && projectData.Status) {
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

module.exports = router;
