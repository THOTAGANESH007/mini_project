import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    isReadBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    message: 
      {
        type: String,
        // [isSent]: {
        //   type: Boolean,
        //   default: true,
        // },
        required: true,
      },
    
  },
  { timestamps: true }
);
const NotificationModel = mongoose.model("Notification", notificationSchema);
export default NotificationModel;
