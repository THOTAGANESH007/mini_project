const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RTISchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  requestDetails: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Rejected", "Completed"],
    default: "Pending",
  },
});

module.exports = model("RTI", RTISchema);
