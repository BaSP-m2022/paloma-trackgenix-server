import express from 'express';

import projectsRoute from './projects';
import employeesRoutes from './employees';
import superAdminRoutes from './superAdmin';
import timeSheets from './timeSheets';
import Tasks from './tasks';
import adminRoutes from './admin';

const router = express.Router();

router.use('/projects', projectsRoute);

router.use('/employees', employeesRoutes);

router.use('/superadmins', superAdminRoutes);

router.use('/timesheets', timeSheets);

router.use('/tasks', Tasks);

router.use('/admin', adminRoutes);

export default router;
