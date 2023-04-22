const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
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
    modeOfPayment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
