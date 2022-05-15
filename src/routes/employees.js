import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidation from '../validations/employees';

const router = express.Router();

router.get('/', employeesController.getAllEmployees);
router.post('/', employeesValidation.validateCreation, employeesController.createEmployee);
router.get('/:id', employeesController.getEmployeesById);
router.put('/:id', employeesController.updateEmployees);
router.delete('/', employeesController.deleteEmployee);

export default router;
