const validator = require("../validators");

module.exports = () => (req, res, next) => {
  const method = req.query.method;
  if (method) {
    if (method.toLowerCase() === "buy") {
      return validator.validateBody(validator.schemas.tradeUpdateBuyValidator)(
        req,
        res,
        next
      );
    } else if (method.toLowerCase() === "sell") {
      return validator.validateBody(validator.schemas.tradeUpdateSellValidator)(
        req,
        res,
        next
      );
    }
  }
  res.sendBadRequest({ message: "Invalid method" });
};
