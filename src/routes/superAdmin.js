import express from 'express';
import superAdminController from '../controllers/super-admins';
import { validateCreateSuperAdmin, validateUpdateSuperAdmin } from '../validations/superAdmin';

const router = express.Router();

router
  .get('/', superAdminController.getAllSuperAdmins)
  .get('/:id', superAdminController.getSuperAdmById)
  .post('/', validateCreateSuperAdmin, superAdminController.createSuperAdmin)
  .delete('/:id', superAdminController.deleteSuperAdm)
  .put('/:id', validateUpdateSuperAdmin, superAdminController.editSuperAdmin);
export default router;
