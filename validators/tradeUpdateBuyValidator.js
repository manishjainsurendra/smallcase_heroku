const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  buyPrice: Joi.number()
    .min(0)
    .required(),
  shares: Joi.number()
    .min(1)
    .required()
});
