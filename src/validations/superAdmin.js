import Joi from 'joi';

const validateSuperAdmin = (req, res, next, superAdmValidation) => {
  // Validate Schema with the body of the request
  const validation = superAdmValidation.validate(req.body);
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
export const validateCreateSuperAdmin = (req, res, next) => {
  const superAdmValidation = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    email: Joi.string().max(30).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().alphanum().min(6).max(20)
      .required(),
  });
  return validateSuperAdmin(req, res, next, superAdmValidation);
};
export const validateUpdateSuperAdmin = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: 'Missing id parameter',
    });
  }
  const superAdmValidation = Joi.object({
    name: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15),
    email: Joi.string().max(30).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().alphanum().min(6).max(20)
    ,
  });
  return validateSuperAdmin(req, res, next, superAdmValidation);
};
