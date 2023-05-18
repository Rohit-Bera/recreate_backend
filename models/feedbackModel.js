const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    feedback: {
      type: String,
    },
    complaint: {
      type: String,
    },
    complaintStatus: {
      type: String,
    },
    admin: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
