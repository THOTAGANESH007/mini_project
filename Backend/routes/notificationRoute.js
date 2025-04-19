import express from "express";
import {
  sendNotification,
  getNotifications,
  deleteNotification,
} from "../controllers/notificationController.js";

const notificationRoute = express.Router();

// POST: Send notifications to all users (excluding specific ones)
notificationRoute.post("/send", sendNotification);

// GET: Get notifications for the logged-in user
notificationRoute.get("/:userId", getNotifications);

// DELETE: Delete a specific message from a user's notification
notificationRoute.delete("/:notificationId/:messageIndex", deleteNotification);

export default notificationRoute;
