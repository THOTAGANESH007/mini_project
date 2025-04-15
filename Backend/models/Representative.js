import mongoose from "mongoose";

const RepresentativeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: {
    type: String,
    enum: ["MLA", "MP", "Collector"],
    required: true,
  },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
  photo_url: { type: String },
  office_address: { type: String, required: true },
});

const RepresentativeModel = mongoose.model(
  "Representative",
  RepresentativeSchema
);
export default RepresentativeModel;
