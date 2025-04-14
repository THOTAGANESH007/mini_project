import mongoose from "mongoose";

const RTISchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  requestDetails: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Rejected", "Completed"],
    default: "Pending",
  },
});

const RTIModel = mongoose.model("RTI", RTISchema);
export default RTIModel;
