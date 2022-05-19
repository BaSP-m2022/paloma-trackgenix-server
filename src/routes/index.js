import express from 'express';

import projectsRoute from './projects';
import employeesRoutes from './employees';
import superAdminRoutes from './superAdmin';
import timeSheets from './timeSheets';
import Tasks from './tasks';

const router = express.Router();

router.use('/projects', projectsRoute);

router.use('/employees', employeesRoutes);

router.use('/timesheets', timeSheets);

router.use('/tasks', Tasks);

router.use('/superadmins', superAdminRoutes);

export default router;
