const mongoose = require("mongoose");
const { Schema } = mongoose;

const WorkerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    workerExperience: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "worker",
    },
  },
  {
    timestamps: true,
  }
);

const Worker = mongoose.model("Worker", WorkerSchema);
module.exports = Worker;
