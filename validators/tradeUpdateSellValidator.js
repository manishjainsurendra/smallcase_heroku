const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  shares: Joi.number()
    .min(1)
    .required()
});
