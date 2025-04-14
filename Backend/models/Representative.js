import mongoose from "mongoose";

const RepresentativeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: {
    type: String,
    enum: ["MLA", "MP", "Collector"],
    required: true,
  },
  email: { type: String, required: true },
  photo_url: { type: String },
  office_address: { type: Object, required: true },
  region_or_area: { type: String, required: true },
});

const RepresentativeModel = mongoose.model(
  "Representative",
  RepresentativeSchema
);
export default RepresentativeModel;
