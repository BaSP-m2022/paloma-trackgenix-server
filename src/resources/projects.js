const express = require('express');
const fs = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(projects);
});

// I have included all atributes that cannot be left in blank in the if statement
router.post('/', (req, res) => {
  const projectData = req.body;
  if (projectData.projectID != null && projectData.projectName != null
    && projectData.totalHours != null && projectData.projectDescription != null
    && projectData.startDate != null && projectData.rate != null && projectData.status != null) {
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

module.exports = router;
