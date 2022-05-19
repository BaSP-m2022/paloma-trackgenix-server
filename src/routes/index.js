import express from 'express';

import projectsRoute from './projects';
import employeesRoutes from './employees';
import timeSheets from './timeSheets';

const router = express.Router();

router.use('/projects', projectsRoute);

router.use('/employees', employeesRoutes);

router.use('/timesheets', timeSheets);

export default router;
