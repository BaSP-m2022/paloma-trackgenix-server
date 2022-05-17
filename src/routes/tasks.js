import express from 'express';
import tasksController from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router
  .get('/', tasksController.getAllTasks)
  .post('/', tasksValidations.validateTasks, tasksController.createTask)
  .get('/:id', tasksController.getTaskByID)
  .put('/:id', tasksController.updateTask)
  .delete('/:id', tasksController.deleteTask);
export default router;
