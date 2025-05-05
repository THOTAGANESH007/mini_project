import mongoose from "mongoose";

const TenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Construction", "IT", "HealthCare", "Transport", "Event"],
    required: true,
  },
  opening_date: { type: Date, required: true },
  deadline: { type: Date, required: true },
  pdf_link: { type: String, required: true },
});

const TenderModel = mongoose.model("Tender", TenderSchema);

export default TenderModel;
