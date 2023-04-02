const mongoose = require("mongoose");
const { Schema } = mongoose;

const SysFeedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    worker: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
    },
    feedback: {
      type: String,
    },
    customerSupport: {
      tokenId: {
        type: mongoose.Types.ObjectId,
      },
      complaint: {
        type: String,
      },
    },
    complaintStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SysFeedback = mongoose.model("Systemfeedback", SysFeedbackSchema);
module.exports = SysFeedback;
