import express from 'express';
import Tasks from './tasks';

const router = express.Router();
router.use('/tasks', Tasks);

import timeSheets from './timeSheets';

const router = express.Router();

router.use('/timesheets', timeSheets);

export default router;
