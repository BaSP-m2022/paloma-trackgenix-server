const Joi = require('joi');

const schema = Joi.object({
  projectName: Joi.string().required(),

  totalHours: Joi.number().required(),

  projectDescription: Joi.string().required(),

  startDate: Joi.date().requiered(),

  finishDate: Joi.date().requiered(),

  rate: Joi.number().required(),

  employeeID: Joi.number().required(),

  role: Joi.string().required(),

  state: Joi.string().required(),
});
module.exports = {
  schema,
};
