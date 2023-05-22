const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    worker: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
    },
    // status - payment is pending or not
    paymentInfo: {
      type: String,
      required: true,
      default: "pending",
    },
    serviceCost: {
      type: Number,
      required: true,
    },
    commision: {
      type: Number,
    },
    finalCost: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
