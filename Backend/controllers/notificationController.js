import NotificationModel from "../models/Notification.js";
import UserModel from "../models/user.js";

// Create a new notification
export const sendNotification = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
        success: false,
      });
    }

    // Create and save the notification
    const newNotification = new NotificationModel({
      message,
      isReadBy: [], // optional, based on your schema
    });

    const savedNotification = await newNotification.save();

    res.status(201).json({
      message: "Notification created successfully",
      data: savedNotification,
      success: true,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({
      message: "Failed to create notification",
      error: error.message,
      success: false,
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.userId; // assuming req.userId is the ObjectId or string

    // Find notifications where isReadBy does NOT include this userId
    const notifications = await NotificationModel.find({
      isReadBy: { $ne: userId },
    })
      .select("message createdAt") // select only what you need
      .sort({ createdAt: -1 });
   
    res.status(200).json({data:notifications});
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
};


// controller/notificationController.js
export const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.body;
  const userId = req.userId; // assume this is set by auth middleware

  try {
    const notification = await NotificationModel.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    // Initialize isReadBy as an array if it doesn't exist
    if (!notification.isReadBy) {
      notification.isReadBy = [];
    }

    // Add userId if not already marked as read
    if (!notification.isReadBy.includes(userId.toString())) {
      notification.isReadBy.push(userId.toString());
      await notification.save();
    }

    return res.status(200).json({
      message: "Notification marked as read.",
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return res.status(500).json({
      message: "Error marking notification as read.",
    });
  }
};

