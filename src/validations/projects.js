/* eslint-disable no-dupe-keys */
import Joi from 'joi';

const validateProject = (req, res, next) => {
  const schema = Joi.object({
    projectName: Joi.string().min(3).required(),

    totalHours: Joi.number().required(),

    projectDescription: Joi.string().min(3).required(),

    startDate: Joi.date().required(),

    finishDate: Joi.date().required(),

    state: Joi.string().min(3).valid('finished', 'started').required(),

    employee: Joi.array().items(Joi.object({

      rate: Joi.number().required(),

      role: Joi.string().min(2).valid('QA', 'DEV', 'TL', 'PM').required(),

      employeeId: Joi.string().hex().length(24).required(),

    })),
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
