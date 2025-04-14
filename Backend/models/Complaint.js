import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["Electrical", "Drainage", "Water_Service", "Other"],
      required: true,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Rejected", "Accepted", "Processing", "Resolved"],
      default: "Pending",
    },
    imageUrl: String,
  },
  { timestamps: true } // ✅ Auto-add createdAt & updatedAt
);

const ComplaintModel = mongoose.model("Complaint", ComplaintSchema);

export default ComplaintModel;
