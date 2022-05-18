import Joi from 'joi';

const validateTimesheet = (req, res, next) => {
  const timesheetValidation = Joi.object({
    name: Joi.string().min(3).required(),
    surName: Joi.string().min(3).required(),
    role: Joi.string().valid('QA', 'PM', 'DEV').min(2).required(),
    startDate: Joi.date().required(),
    finishDate: Joi.date().required(),
    regularHours: Joi.number().min(1).required(),
    overtimeHours: Joi.number().required(),
    rate: Joi.string().min(2).required(),
    project: Joi.string().required(),
    task: Joi.string().required(),
  });
    // Validate Schema with the body of the request
  const validation = timesheetValidation.validate(req.body);
  // If exists an error, return a 400 response with the error detail
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during validation of the request',
      error: validation.error.details[0].message,
    });
  }
  // If not exists an error, next is executed to continue with the next function
  return next();
};

const validatePutTimesheet = (req, res, next) => {
  const timesheetValidation = Joi.object({
    name: Joi.string().min(3),
    surName: Joi.string().min(3),
    role: Joi.string().min(2),
    startDate: Joi.date(),
    finishDate: Joi.date(),
    regularHours: Joi.number().min(1),
    overtimeHours: Joi.number(),
    rate: Joi.string().min(2),
    project: Joi.string(),
    task: Joi.string(),
  });
  // Validate Schema with the body of the request
  const validation = timesheetValidation.validate(req.body);
  // If exists an error, return a 400 response with the error detail
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during validation of the request',
      error: validation.error.details[0].message,
    });
  }
  // If not exists an error, next is executed to continue with the next function
  return next();
};
export default {
  validateTimesheet,
  validatePutTimesheet,
};
