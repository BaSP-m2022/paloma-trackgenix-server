import express from 'express';
import timeSheets from './timeSheets';
import superAdminRoutes from './superAdmin';

router.use('/superadmins', superAdminRoutes);

const router = express.Router();

router.use('/timesheets', timeSheets);

export default router;
