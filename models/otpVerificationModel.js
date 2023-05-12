const mongoose = require("mongoose");
const { Schema } = mongoose;

const otpSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  orderid: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  otp: {
    type: Number,
  },
});

const Otpverify = mongoose.model("Otpverify", otpSchema);

module.exports = Otpverify;
