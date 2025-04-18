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
    avgRating: { type: Number, default: 0 },
   
    reviews: [
      {
       type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true } // Auto-add createdAt & updatedAt
);
const PlaceModel = mongoose.model("Place", PlaceSchema);
export default PlaceModel;
