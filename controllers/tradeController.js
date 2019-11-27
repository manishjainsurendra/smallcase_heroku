const trade = require("../models/trade");

exports.getTrades = async (req, res) => {
  try {
    const trades = await trade.find({});
    res.json(trades);
  } catch (err) {
    console.log(err);
    res.sendServerError();
  }
};

exports.addTrade = async (req, res) => {
  try {
    const { tickerSymbol, avgBuyPrice, shares } = req.body;

    // check for existing symbol
    const isTickerExists = await trade.findOne({ tickerSymbol });
    if (isTickerExists)
      return res.sendAlreadyExists({ message: "Ticker already exists!" });

    const newTrade = new trade({ tickerSymbol, avgBuyPrice, shares });
    const savedTrade = await newTrade.save();
    res.sendCreated(savedTrade);
  } catch (err) {
    console.log(err);
    res.sendServerError();
  }
};

exports.updateTradeById = async (req, res) => {
  try {
    const id = req.params.id;
    const method = req.query.method;
    const details = req.body;
    let existingTrade = await trade.findById(id);
    if (!existingTrade) {
      return res.sendNotFound();
    }
    let initialBuy = existingTrade.avgBuyPrice;
    let initialShares = existingTrade.shares;
    if (method.toLowerCase() === "sell") {
      existingTrade.shares -= Number.parseInt(details.shares);
      if (existingTrade.shares < 0) {
        return res
          .status(400)
          .send({ message: `cannot sell more than ${initialShares}` });
      }
      await existingTrade.save();
    } else if (method.toLowerCase() === "buy") {
      let sum = initialShares * initialBuy;
      sum +=
        Number.parseInt(details.shares) * Number.parseFloat(details.buyPrice);
      existingTrade.shares += Number.parseInt(details.shares);
      existingTrade.avgBuyPrice = sum / existingTrade.shares;
      await existingTrade.save();
    }
    return res.status(200).json(existingTrade);
  } catch (err) {
    console.log(err);
    res.sendServerError();
  }
};

exports.deleteTradeById = async (req, res) => {
  try {
    const tickerId = req.params.id;
    const deletedTicker = await trade.findByIdAndDelete(tickerId);
    if (!deletedTicker) return res.sendNotFound();
    res.json(deletedTicker);
  } catch (err) {
    console.log(err);
    res.sendServerError();
  }
};

exports.getReturns = async (req, res) => {
  try {
    const todayPrice = 1000;
    const trades = await trade.find();
    let i;
    let returns = 0;
    for (i = 0; i < trades.length; i++) {
      returns += (todayPrice - trades[i].avgBuyPrice) * trades[i].shares;
    }
    let responsejson = {
      returns
    };
    return res.json(responsejson);
  } catch (err) {
    console.log(err);
    res.sendServerError();
  }
};
