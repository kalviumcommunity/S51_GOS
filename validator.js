const Joi = require("joi");
const validator = (schema) => (data) =>
  schema.validate(data, { abortEarly: false });

const postUpdateSchema = Joi.object({
  SneakerID: Joi.number().required(),
  Brand: Joi.string().required(),
  Model: Joi.string().required(),
  Type: Joi.string().required(),
  Color: Joi.string().required(),
  Size: Joi.number().required(),
  Price: Joi.number().required(),
  Availability: Joi.string().required(),
});

const updateAndPostValidator = validator(postUpdateSchema);
module.exports = updateAndPostValidator;
