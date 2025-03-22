const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RepresentativeSchema = new Schema({
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

module.exports = model("Representative", RepresentativeSchema);
