const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PlaceSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Park", "Temple", "Museums", "Zoos"],
    required: true,
  },
  image_url: { type: String },
  rating: { type: Number, default: 0 },
});

module.exports = model("Place", PlaceSchema);
