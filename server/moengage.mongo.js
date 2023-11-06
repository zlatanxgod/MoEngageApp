import mongoose from "mongoose";

const monengageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
  },
});

export default mongoose.model("Moengage", monengageSchema);
