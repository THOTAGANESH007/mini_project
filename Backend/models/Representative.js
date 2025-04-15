import mongoose from "mongoose";

const RepresentativeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: {
    type: String,
  
    required: true,
  },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  photoUrl: { type: String },
  officeAddress: { type: String, required: true },
});

const RepresentativeModel = mongoose.model(
  "Representative",
  RepresentativeSchema
);
export default RepresentativeModel;
