import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["Electrical", "Sanitation", "Water_Service"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Rejected", "Accepted", "Processing", "Resolved"],
      default: "Pending",
    },
    imageUrl: String,
  },
  { timestamps: true }
);

const ComplaintModel = mongoose.model("Complaint", ComplaintSchema);

export default ComplaintModel;
