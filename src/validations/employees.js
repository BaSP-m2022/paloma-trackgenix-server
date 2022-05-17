import Joi from 'joi';

const validateEmployee = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
    assignedRole: Joi.string().valid('QA', 'DEV', 'TL', 'PM').optional(),
    assignedTask: Joi.string().optional(),
  });

  // Validate Schema with the body of the request
  const validation = employeeValidation.validate(req.body);

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
export default { validateEmployee };
