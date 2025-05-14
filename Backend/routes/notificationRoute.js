import express from "express";
import {
  sendNotification,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controllers/notificationController.js";
import auth from "../middlewares/auth.js";

const notificationRoute = express.Router();

// POST: Send notifications to all users
notificationRoute.post("/send", auth, sendNotification);

// GET: Get unread notifications for the logged-in user
notificationRoute.get("/", auth, getNotifications);

// PATCH: Mark a single notification as read for the current user
notificationRoute.patch("/read", auth, markNotificationAsRead);

// PATCH: Mark all notifications as read for the current user
notificationRoute.patch("/read-all", auth, markAllNotificationsAsRead);

export default notificationRoute;
