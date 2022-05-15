import express from 'express';
import projectsController from '../controllers/projects';

const router = express.Router();

router
  .get('/', projectsController.getAllProjects)
  .get('/:id', projectsController.getProjectsById)
  .post('/', projectsController.createProject);

export default router;
