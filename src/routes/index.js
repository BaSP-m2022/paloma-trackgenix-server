import express from 'express';
import superAdminRoutes from './superAdmin';

const router = express.Router();

router.use('/superadmins', superAdminRoutes);
export default router;
