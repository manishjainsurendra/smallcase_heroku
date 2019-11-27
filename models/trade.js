const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  tickerSymbol: {
    type: String,
    unique: true
  },
  avgBuyPrice: {
    type: Number,
    min: 0
  },
  shares: {
    type: Number,
    min: 0
  }
});

module.exports = mongoose.model("trade", tradeSchema);
