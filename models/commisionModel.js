const mongoose = require("mongoose");
const { Schema } = mongoose;

const commisionSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  commision: {
    type: Number,
    required: true,
  },
  // worker has paid or not
  commisionStatus: {
    type: Boolean,
    default: false,
  },
});

const Commision = mongoose.model("Commision", commisionSchema);
module.exports = Commision;
