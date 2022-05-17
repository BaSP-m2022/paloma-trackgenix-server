/* eslint-disable no-dupe-keys */
import Joi from 'joi';

const validateProject = (req, res, next) => {
  const schema = Joi.object({
    projectName: Joi.string().min(3).required(),

    totalHours: Joi.number().required(),

    projectDescription: Joi.string().min(3).required(),

    startDate: Joi.date().required(),

    finishDate: Joi.date().required(),

    rate: Joi.number().required(),

    employeeID: Joi.string().required(),

    role: Joi.string().min(2).required(),
    enum: ['QA', 'DEV', 'TL', 'PM'],

    state: Joi.string().min(3).required(),
    enum: ['finished', 'started'],
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'Error in the request',
      error: validation.error.details[0].message,
    });
  }

  return next();
};

export default { validateProject };
