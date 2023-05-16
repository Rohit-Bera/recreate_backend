const mongoose = require("mongoose");
const { Schema } = mongoose;

const commisionSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  commision: {
    type: Number,
  },
  // worker has paid or not
  commisionStatus: {
    type: String,
    default: "pending",
  },
});

const Commision = mongoose.model("Commision", commisionSchema);
module.exports = Commision;
