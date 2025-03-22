const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ComplaintSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: String,
    enum: [
      "Billing_Issue",
      "Service_Issue",
      "Technical_Issue",
      "Fraud",
      "Other",
    ],
    required: true,
  },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Resolved", "Pending"], default: "Pending" },
  timestamps: { type: Date, default: Date.now },
});

module.exports = model("Complaint", ComplaintSchema);
