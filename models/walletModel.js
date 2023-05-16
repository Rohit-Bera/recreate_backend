const mongoose = require("mongoose");
const { Schema } = mongoose;

const walletSchema = new Schema({
  worker: {
    type: Schema.Types.ObjectId,
    ref: "Worker",
  },
  TotalBalance: {
    type: Number,
  },
  transaction: {
    type: Array,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
