const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    worker: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bookedDate: {
      type: Date,
    },
    visitDate: {
      type: Date,
      default: null,
    },
    // completed by worker or not [pending / done /canceled]
    orderStatus: {
      type: String,
      deafult: "pending",
    },

    // service request for from the services
    serviceName: {
      type: String,
    },
    request: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
