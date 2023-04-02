// order placed by customer
const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema({
  // type of servcie [carpenter , painter , plumber]
  service: {
    serviceName: {
      type: String,
    },
    serviceImage: {
      type: String,
    },
    serviceDescription: {
      type: String,
    },
  },
  launchedService: {
    launchedServiceName: {
      type: String,
    },
    launchedServiceImage: {
      type: Array,
    },
    launchedServiceDescription: {
      type: String,
    },
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
