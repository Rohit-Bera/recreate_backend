const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    worker: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Worker",
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
