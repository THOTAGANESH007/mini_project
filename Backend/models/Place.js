import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
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
const PlaceModel = mongoose.model("Place", PlaceSchema);
export default PlaceModel;
