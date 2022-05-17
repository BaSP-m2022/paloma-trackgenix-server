import express from 'express';
import tasksController from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router
  .get('/', tasksController.getAllTasks)
  .post('/', tasksValidations.validateTasks, tasksController.createTask);

export default router;
