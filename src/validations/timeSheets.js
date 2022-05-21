import Joi from 'joi';

const validateTimesheet = (req, res, next) => {
  const timesheetValidation = Joi.object({
    employee: Joi.string().hex().length(24).required(),
    startDate: Joi.date().required(),
    finishDate: Joi.date().required(),
    regularHours: Joi.number().min(1).required(),
    overtimeHours: Joi.number().required(),
    rate: Joi.string().min(2).required(),
    project: Joi.string().hex().length(24).required(),
    task: Joi.string().hex().length(24).required(),
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
    employee: Joi.string().hex().length(24),
    startDate: Joi.date(),
    finishDate: Joi.date(),
    regularHours: Joi.number().min(1),
    overtimeHours: Joi.number(),
    rate: Joi.string().min(2),
    project: Joi.string().hex().length(24),
    task: Joi.string().hex().length(24),
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
