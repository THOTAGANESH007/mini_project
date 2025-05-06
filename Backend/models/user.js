import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.^#()\-_=+])[A-Za-z\d@$!%*?&.^#()\-_=+]{8,}$/,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    ],
  },

  mobile: {
    type: String,
    default: "",
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  profile: { type: String, default: "" },
  refresh_token: { type: String, default: "" },
  verify_email: { type: Boolean, default: false },
  forgot_password_otp: { type: String, default: null },
  forgot_password_expired: { type: Date, default: "" },
  role: {
    type: String,
    enum: [
      "User",
      "Admin",
      "Electric Officer",
      "Water Officer",
      "Sanitation Officer",
    ],
    default: "User",
  },
  representative: { type: mongoose.Schema.ObjectId, ref: "Representative" },
  attend_events: [{ type: mongoose.Schema.ObjectId, ref: "Event" }],
  can_view: [
    { type: mongoose.Schema.ObjectId, ref: "Tender" },
    { type: mongoose.Schema.ObjectId, ref: "Census" },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
