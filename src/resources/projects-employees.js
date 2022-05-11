const express = require('express');
const fs = require('fs');
const projectsEmployees = require('../data/projects-employees.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(projectsEmployees);
});

router.post('/', (req, res) => {
  const projectEmployeeData = req.body;
  if (projectEmployeeData.projectID != null && projectEmployeeData.employeeID != null
        && projectEmployeeData.role != null) {
    projectsEmployees.push(projectEmployeeData);
    fs.writeFile('src/data/projects-employees.json', JSON.stringify(projectsEmployees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee assigned to project');
      }
    });
  }
});

module.exports = router;
