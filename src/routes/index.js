import express from 'express';
import projectsRoute from './projects';
import employeesRoutes from './employees';

const router = express.Router();

router.use('/projects', projectsRoute);

router.use('/employees', employeesRoutes);

export default router;
