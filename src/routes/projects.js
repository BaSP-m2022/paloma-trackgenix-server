import express from 'express';
import projectsController from '../controllers/projects';
import validator from '../validations/projects';

const router = express.Router();

router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProjectsById);
router.post('/', validator.validateProject, projectsController.createProject);
router.delete('/:id', projectsController.deleteProject);
router.put('/:id', validator.validateProject, projectsController.editProject);

export default router;
