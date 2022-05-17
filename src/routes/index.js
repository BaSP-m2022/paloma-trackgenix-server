import express from 'express';
import projectsRoute from './projects';

const router = express.Router();

router.use('/projects', projectsRoute);

import employeesRoutes from './employees';

const router = express.Router();

router.use('/employees', employeesRoutes);

export default router;
