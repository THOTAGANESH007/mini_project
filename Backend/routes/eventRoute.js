import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// Routes
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", upload.single("image"), createEvent); // Expecting 'image' field
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
