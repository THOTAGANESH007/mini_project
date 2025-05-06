import mongoose from "mongoose";

const RepresentativeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  photoUrl: { type: String },
  officeAddress: { type: String, required: true },
});

const RepresentativeModel = mongoose.model(
  "Representative",
  RepresentativeSchema
);
export default RepresentativeModel;
