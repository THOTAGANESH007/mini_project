import NotificationModel from "../models/Notification.js";
import UserModel from "../models/user.js";

// Create a new notification
export const sendNotification = async (req, res) => {
  const { message } = req.body;

  // List of email addresses to exclude
  const excludedEmails = [
    "admin@gmail.com",
    "electricOfficer123@gmail.com",
    "sanitizationOfficer123@gmail.com",
    "waterOfficer123@gmail.com",
  ];

  try {
    // Fetch all users except those whose emails are in the exclusion list
    const users = await UserModel.find({ email: { $nin: excludedEmails } });

    // Create a notification for each user
    const notifications = users.map((user) => {
      return new NotificationModel({
        userId: user._id,
        message: message,
      });
    });

    // Save notifications to the database
    await NotificationModel.insertMany(notifications);

    res
      .status(201)
      .json({ message: "Notifications sent to all users successfully!" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ message: "Error sending notifications." });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch notifications for the logged-in user
    const notifications = await NotificationModel.find({ userId })
      .select("message") // This will only select the "message" field
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
};

export const deleteNotification = async (req, res) => {
  const { notificationId, messageIndex } = req.params; // Get notificationId and messageIndex from URL

  try {
    // Find the notification by ID
    const notification = await NotificationModel.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    // Check if the message index is valid
    if (messageIndex < 0 || messageIndex >= notification.message.length) {
      return res.status(400).json({ message: "Invalid message index." });
    }

    // Remove the specific message from the array
    notification.message.splice(messageIndex, 1);

    // Save the updated notification
    await notification.save();

    res
      .status(200)
      .json({ message: "Notification message deleted successfully." });
  } catch (error) {
    console.error("Error deleting notification message:", error);
    res.status(500).json({ message: "Error deleting notification message." });
  }
};
