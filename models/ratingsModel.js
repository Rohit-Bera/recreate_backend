const mongoose = require("mongoose");
const { Schema } = mongoose;

const Ratings = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    feedbackDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", Ratings);
module.exports = Rating;
