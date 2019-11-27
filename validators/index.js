const Joi = require("@hapi/joi");
const tradeValidator = require("./tradeValidator");
const tradeUpdateBuyValidator = require("./tradeUpdateBuyValidator");
const tradeUpdateSellValidator = require("./tradeUpdateSellValidator");

module.exports = {
  validateBody: schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.sendBadRequest(result.error);
    }
    next();
  },
  schemas: {
    tradeValidator,
    tradeUpdateBuyValidator,
    tradeUpdateSellValidator
  }
};
