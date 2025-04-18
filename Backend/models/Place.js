import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Temples",
        "Theatres",
        "Parks",
        "Hotels",
        "Lodges",
        "Restaurants",
        "Gyms",
        "Aquariums",
        "Art Galleries",
        "Museums",
        "Cafes",
        "Malls",
        "Beaches",
        "Zoos",
      ],
      required: true,
    },
    imageUrl: { type: String },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    reviews: [
      {
        userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
        rating: { type: Number, required: true },
        review: { type: String },
      },
    ],
  },
  { timestamps: true } // Auto-add createdAt & updatedAt
);
const PlaceModel = mongoose.model("Place", PlaceSchema);
export default PlaceModel;
