const mongoose = require("mongoose");
const { Schema } = mongoose;

const verificationSchema = new Schema(
  {
    worker: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    verificationDocument1: {
      type: String,
      required: true,
    },
    verificationDocument2: {
      type: String,
      required: true,
    },
    workImages: {
      type: Array,
      required: true,
    },
    verificationStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const ProfVerification = mongoose.model("Verification", verificationSchema);

module.exports = ProfVerification;
