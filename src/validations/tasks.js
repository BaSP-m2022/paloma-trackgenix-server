const joi = require('joi');

const validateTasks = (req, res, next) => {
  const tasksValidations = joi.object({
    taskName: joi.string().min(3).required(),
    taskDescription: joi.string().min(3).required(),
    status: joi.string().required(),
    employeeID: joi.number(),
  });
  const validation = tasksValidations.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during validation of the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

const validateUpdateTasks = (req, res, next) => {
  const tasksValidations = joi.object({
    taskName: joi.string().min(3),
    taskDescription: joi.string().min(3),
    status: joi.string(),
    employeeID: joi.number(),
  });
  const validation = tasksValidations.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during validation of the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default {
  validateTasks,
  validateUpdateTasks,
};
