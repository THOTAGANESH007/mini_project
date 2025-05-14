import NotificationModel from "../models/Notification.js";
import UserModel from "../models/user.js";

// Send notification to all users
export const sendNotification = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
        success: false,
      });
    }

    // Get all users from the database
    const allUsers = await UserModel.find({}, "_id");

    // Create and save the notification with empty isReadBy array
    // (users will be added to isReadBy as they mark it as read)
    const newNotification = new NotificationModel({
      message,
      isReadBy: [], // Start with empty array - no one has read it yet
    });

    const savedNotification = await newNotification.save();

    res.status(201).json({
      message: `Notification created successfully and sent to ${allUsers.length} users`,
      data: savedNotification,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create notification",
      error: error.message,
      success: false,
    });
  }
};

// Get all unread notifications for the logged-in user
export const getNotifications = async (req, res) => {
  try {
    const userId = req.userId; // Set by auth middleware

    // Find notifications where isReadBy does NOT include this userId
    const notifications = await NotificationModel.find({
      isReadBy: { $ne: userId },
    })
      .select("message createdAt") // Select only needed fields
      .sort({ createdAt: -1 });

    res.status(200).json({
      data: notifications,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications.",
      success: false,
    });
  }
};

// Mark a single notification as read for the current user
export const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.body;
  const userId = req.userId; // Set by auth middleware

  try {
    const notification = await NotificationModel.findById(notificationId);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found.",
        success: false,
      });
    }

    // Add userId to isReadBy array if not already there
    if (!notification.isReadBy.includes(userId)) {
      notification.isReadBy.push(userId);
      await notification.save();
    }

    return res.status(200).json({
      message: "Notification marked as read.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error marking notification as read.",
      success: false,
    });
  }
};

// Mark all notifications as read for the current user
export const markAllNotificationsAsRead = async (req, res) => {
  const userId = req.userId; // Set by auth middleware

  try {
    // Find all notifications where this user is NOT in isReadBy
    const unreadNotifications = await NotificationModel.find({
      isReadBy: { $ne: userId },
    });

    // Add userId to isReadBy for each notification
    const updatePromises = unreadNotifications.map((notification) => {
      notification.isReadBy.push(userId);
      return notification.save();
    });

    await Promise.all(updatePromises);

    return res.status(200).json({
      message: `${unreadNotifications.length} notifications marked as read.`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error marking all notifications as read.",
      success: false,
    });
  }
};
