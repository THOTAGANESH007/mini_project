const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  organizer_name: { type: String, required: true },
  organizer_image: { type: String },
  is_free: { type: Boolean, required: true },
  ticket_price: { type: Number },
  registration_link: { type: String },
  status: {
    type: String,
    enum: ["Scheduled", "Ongoing", "Completed", "Cancelled"],
    required: true,
  },
  notificationSent: { type: Boolean, default: false },
});

module.exports = model("Event", EventSchema);
