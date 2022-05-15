import Projects from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Projects.find({});
    return res.status(200).json(allProjects);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error',
    });
  }
};

const getProjectsById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await Projects.findById(req.params.id);
      return res.status(200).json(project);
    }
    return res.status(400).json({
      msg: 'missing id parameter',
    });
  } catch (error) {
    return res.json({
      msg: error,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = new Projects({
      projectName: req.body.projectName,
      totalHours: req.body.totalHours,
      projectDescription: req.body.projectDescription,
      startDate: req.body.startDate,
      finishDate: req.body.finishDate,
      rate: req.body.rate,
      employeeID: req.body.employeeID,
      role: req.body.role,
      state: req.body.state,
    });
    const result = await project.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({ message: 'There was an error saving the employee' });
  }
};

export default { getAllProjects, getProjectsById, createProject };
/* const express = require('express');
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
router.get('/:projectID', (req, res) => {
  const findProject = req.params.projectID;
  const projectFound = projects.find((project) => project.projectID === findProject);
  if (projectFound) {
    res.send(projectFound);
  } else {
    res.send('Project not found');
  }
});

router.delete('/:projectID', (req, res) => {
  const projectId = req.params.projectID;
  const filteredProject = projects.filter((project) => project.projectID !== projectId);
  if (projects.length === filteredProject.length) {
    res.send('Could not delete the project because it was not found');
  } else {
    fs.writeFile('src/data/projects.json', JSON.stringify(filteredProject), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project deleted');
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
    res.send(`There is no projects with a rate equal to "${rateProject}"`);
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
    res.send(`There is no projects with the "${roleProject}" role`);
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

module.exports = router; */
