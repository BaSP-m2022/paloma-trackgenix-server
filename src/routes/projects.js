import express from 'express';
import projectsController from '../controllers/projects';

const router = express.Router();

router
  .get('/', projectsController.getAllProjects)
  .get('/:id', projectsController.getProjectsById)
  .post('/', projectsController.createProject)
  .delete('/:id', projectsController.deleteProject)
  .put('/:id', projectsController.editProject);

export default router;
