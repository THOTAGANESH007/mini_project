import EventModel from "../models/Event.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

// GET all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// GET a single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

// POST create a new event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      date,
      organizer_name,
      is_free,
      ticket_price,
      registration_link,
      status,
    } = req.body;

    const image = req.file;

    if (!image) {
      return res.status(400).json({
        message: "No image uploaded",
        error: true,
        success: false,
      });
    }

    const upload = await uploadImageCloudinary(image);

    const payload = {
      title,
      description,
      location,
      date,
      organizer_name,
      is_free,
      ticket_price: is_free === "yes" ? 0 : ticket_price,
      registration_link,
      status,
      img: upload.url,
    };

    const newEvent = new EventModel(payload);
    const savedEvent = await newEvent.save();
    // if(savedEvent)
    //     console.log("success");
    res.json({
      message: "Event created successfully",
      data: {
        image_url: upload.url,
        event: savedEvent,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};

// PUT update an event
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent)
      return res.status(404).json({ error: "Event not found" });
    //console.log("updated successfully");
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE an event
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);
    if (!deletedEvent)
      return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted successfully" });
    //console.log("successfully deleted");
    // res.redirect('');
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
