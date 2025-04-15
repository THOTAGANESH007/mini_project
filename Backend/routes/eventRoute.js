import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import upload from "../middlewares/multer.js";

const eventRouter = express.Router();

// Routes
eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getEventById);
eventRouter.post("/", upload.single("image"), createEvent); // Expecting 'image' field
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
