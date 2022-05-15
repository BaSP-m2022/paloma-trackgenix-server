import express from 'express';
import employeesRoutes from './employees';

const router = express.Router();

router.use('/employees', employeesRoutes);

export default router;
