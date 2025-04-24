import express from "express";
import {
  sendNotification,
  getNotifications,
  deleteNotification,
  markNotificationAsRead,
} from "../controllers/notificationController.js";
import auth from "../middlewares/auth.js";

const notificationRoute = express.Router();

// POST: Send notifications to all users (excluding specific ones)
notificationRoute.post("/send", auth,sendNotification);

// GET: Get notifications for the logged-in user
notificationRoute.get("/",auth, getNotifications);

// DELETE: Delete a specific message from a user's notification
notificationRoute.delete("/",auth, markNotificationAsRead);

export default notificationRoute;
