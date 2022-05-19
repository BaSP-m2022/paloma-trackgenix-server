import express from 'express';
import adminController from '../controllers/administrator';
import adminValidation from '../validations/admin';

const router = express.Router();

router
  .get('/', adminController.getAllAdmins)
  .get('/:id', adminController.getAdminById)
  .post('/', adminValidation.validateCreate, adminController.createAdmin)
  .put('/:id', adminValidation.validateEdit, adminController.editAdmin)
  .delete('/:id', adminController.deleteAdmin);

export default router;
