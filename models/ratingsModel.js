const mongoose = require("mongoose");
const { Schema } = mongoose;

const Ratings = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
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
