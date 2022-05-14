import express from 'express';
import timeSheets from './timeSheets';

const router = express.Router();

router.use('/timeSheets', timeSheets);

export default router;
