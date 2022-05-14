import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import timeSheetsValidation from '../validations/timeSheets';

const router = express.Router();

router
  .get('/', timeSheetsController)
  .get('/:id', timeSheetsController)
  .post('/', timeSheetsValidation, timeSheetsController)
  .put('/:id', timeSheetsController)
  .delete('/:id', timeSheetsController);

export default router;
