import express from 'express';
import Tasks from './tasks';

const router = express.Router();
router.use('/tasks', Tasks);

export default router;
