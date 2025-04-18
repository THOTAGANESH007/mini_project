import mongoose from "mongoose";

const AppointMentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    department: {
      type: String,
      enum: ["Electrical", "Sanitation", "Water_Service"],
      required: true,
    },
    description: { type: String, required: true },

    appointmentDate: { type: Date, default: "" },
    appointmentTime: { type: String, default: "" },
    appointmentStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const AppointMentModel = mongoose.model("AppointMent", AppointMentSchema);
export default AppointMentModel;
