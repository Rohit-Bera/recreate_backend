const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  // type of servcie [carpenter , painter , plumber]
  service: {
    type: String,
    required: true,
  },
  // service request for from the services
  request: {
    type: String,
  },
  // accept or pending by worker
  serviceStatus: {
    type: String,
    required: true,
    default: "pending",
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
