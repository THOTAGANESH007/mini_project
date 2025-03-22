const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TenderSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "Construction",
      "IT",
      "HealthCare",
      "Transport",
      "Education",
      "Other",
    ],
    required: true,
  },
  opening_date: { type: Date, required: true },
  deadline: { type: Date, required: true },
  pdf_link: { type: String, required: true },
});

module.exports = model("Tender", TenderSchema);
