import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    gender: Joi.string().valid('male', 'female').required(),
    active: Joi.boolean(),
  });

  const validation = adminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during validation',
      data: { validateCreate },
      error: validation.error.details[0].message,
    });
  // eslint-disable-next-line no-else-return
  } else {
    return next();
  }
};

const validateEdit = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().min(3).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    gender: Joi.string().valid('male', 'female').required(),
    active: Joi.boolean(),
  });
  const validation = adminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during validation',
      data: { validateCreate },
      error: validation.error.details[0].message,
    });
    // eslint-disable-next-line no-else-return
  } else {
    return next();
  }
};

export default {
  validateCreate,
  validateEdit,
};
