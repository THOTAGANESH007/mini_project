import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  placeId: { type: mongoose.Schema.ObjectId, ref: "Place", required: true },
  rating: { type: Number, required: true },
  review_count: { type: Number, default: 0 },
  comment: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const ReviewModel = mongoose.model("Review", ReviewSchema);
export default ReviewModel;
