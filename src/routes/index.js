import express from 'express';

import superAdminRoutes from './superAdmin';
import timeSheets from './timeSheets';
import Tasks from './tasks';
import adminRoutes from './admin';
import employeesRoutes from './employees';

const router = express.Router();

router.use('/superadmins', superAdminRoutes);

router.use('/timesheets', timeSheets);

router.use('/tasks', Tasks);

router.use('/admin', adminRoutes);

router.use('/employees', employeesRoutes);

export default router;
