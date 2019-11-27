const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  tickerSymbol: Joi.string()
    .min(4)
    .required(),
  avgBuyPrice: Joi.number()
    .min(0)
    .required(),
  shares: Joi.number()
    .min(1)
    .required()
});
