const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  placeId: { type: Schema.Types.ObjectId, ref: "Place", required: true },
  rating: { type: Number, required: true },
  review_count: { type: Number, default: 0 },
  comment: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = model("Review", ReviewSchema);
