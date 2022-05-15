import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import timeSheetsValidation from '../validations/timeSheets';

const router = express.Router();

router
  .get('/', timeSheetsController.getAllTimeSheets)
  .get('/:id', timeSheetsController.getTimeSheetsById)
  .post('/', timeSheetsValidation.validateTimesheet, timeSheetsController.createTimesheet);
//   .put('/:id', timeSheetsValidation.validateTimesheet, timeSheetsController)
//   .delete('/:id', timeSheetsController);

export default router;
