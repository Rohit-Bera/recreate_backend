const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentInfo: {
      type: String,
      required: true,
      default: "pending",
    },
    serviceCost: {
      type: Number,
      required: true,
    },
    // completed by worker or not [pending / done]
    orderStatus: {
      type: String,
      required: true,
      deafult: "pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
