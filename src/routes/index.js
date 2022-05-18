import express from 'express';

import timeSheets from './timeSheets';

const router = express.Router();

router.use('/timesheets', timeSheets);

export default router;
