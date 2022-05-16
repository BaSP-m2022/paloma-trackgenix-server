import express from 'express';
import projectsRoute from './projects';

const router = express.Router();

router.use('/projects', projectsRoute);

export default router;
