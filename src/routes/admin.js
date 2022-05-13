import express from 'express';
import adminController from '../controllers/administrator';
// import adminValidation from '../validations/admin';

const router = express.Router();

router
  .get('/', adminController.getAllAdmins);
/*  .post('/', adminValidation.validateCreate, adminController.createAdmin)
  .get('/', adminController.getOneAdmin)
  .put('/', adminValidation.validateUpdate, adminController.updateAdmin)
  .delete('/', adminController.deleteAdmin);
  */

export default router;
