import express from 'express';
import superadminController from '../controllers/super-admins';

const router = express.Router();

router.get('/', superadminController.getAllSuperAdmins);
export default router;
