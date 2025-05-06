import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    placeId: { type: mongoose.Schema.ObjectId, ref: "Place", required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

// Unique index to prevent duplicate reviews by the same user

const ReviewModel = mongoose.model("Review", ReviewSchema);
export default ReviewModel;
