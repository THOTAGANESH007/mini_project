import NotificationModel from "../models/Notification.js";
import UserModel from "../models/user.js";

//Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, "_id name email");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Send notification to all users
export const sendNotification = async (req, res) => {
  const { userIds, message } = req.body;

  if (!Array.isArray(userIds) || !message) {
    return res
      .status(400)
      .json({ success: false, error: "userIds and message are required" });
  }

  try {
    const notifications = userIds.map((userId) => ({
      userId,
      message,
    }));

    await NotificationModel.insertMany(notifications);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Notification insert error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all unread notifications for the logged-in user
export const getNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    //console.log("User ID:", userId);
    // Fetch only the message field from unread notifications
    const notifications = await NotificationModel.find({
      userId,
      isRead: false,
    })
      .sort({ createdAt: -1 }) 
      .lean();
    //console.log("Notifications:", notifications);

    // Extract message strings into an array
    //const messages = notifications.map((notification) => notification.message);
    //console.log("Messages:", messages);
    // Send the messages array as the response
    res.status(200).json({ data: notifications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

// Mark a single notification as read for the current user
export const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.body;
  console.log("Notification ID:", notificationId);
  const userId = req.userId;

  try {
    const updatedNotification = await NotificationModel.findOneAndUpdate(
      { _id: notificationId, userId },
      { $set: { isRead: true } },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    console.log("Notification marked as read:", notificationId);
    res.status(200).json({ message: "Marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Error marking as read" });
  }
};

// Mark all notifications as read for the current user
export const markAllNotificationsAsRead = async (req, res) => {
  const userId = req.userId;
  console.log("User ID:", userId);

  try {
    const result = await NotificationModel.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );

    console.log("Marked all as read for user:", userId);
    res
      .status(200)
      .json({ message: "All notifications marked as read", result });
  } catch (error) {
    console.error("Error updating notifications:", error);
    res.status(500).json({ message: "Error updating notifications" });
  }
};
