import express from 'express';
import adminRoutes from './admin';
import employeesRoutes from './employees';

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/employees', employeesRoutes);

export default router;
