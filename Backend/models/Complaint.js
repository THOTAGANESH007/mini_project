import mongoose from "mongoose";

const { Schema } = mongoose; // ✅ Extract Schema from mongoose

const ComplaintSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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

const Complaint = mongoose.model("Complaint", ComplaintSchema);

export default Complaint;
