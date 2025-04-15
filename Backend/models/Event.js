import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String},
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  organizer_name: { type: String, required: true },
  is_free: { type: Boolean, required: true },
  ticket_price: { type: Number },
  registration_link: { type: String },
  status: {
    type: String,
    enum: ["Scheduled", "Ongoing", "Completed", "Cancelled"],
  },
});
const EventModel = mongoose.model("Event", EventSchema);
export default EventModel;
