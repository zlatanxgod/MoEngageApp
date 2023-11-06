import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
  rating: Number,
  review: String,
});

const monengageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
  },

  reviewsRatings: [subSchema],
});

export default mongoose.model("Moengage", monengageSchema);
