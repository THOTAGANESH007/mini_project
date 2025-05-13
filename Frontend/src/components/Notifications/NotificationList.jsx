// src/components/NotificationList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCheck } from "lucide-react";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/notifications`,
        {
          withCredentials: true,
        }
      );
      setNotifications(res.data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/notifications`,
        {
          data: { notificationId },
          withCredentials: true,
        }
      );
      console.log(res);
      fetchNotifications(); // Refresh after marking as read
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  if (!notifications) return;
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-md shadow-lg p-4 z-50 max-h-96 overflow-y-auto">
      <h3 className="font-semibold text-lg mb-2">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-sm text-gray-500">No notifications.</p>
      ) : (
        notifications.map((n) =>
          (Array.isArray(n.message) ? n.message : [n.message]).map(
            (msg, idx) => (
              <div
                key={`${n._id}-${idx}`}
                className="flex justify-between items-center py-1"
              >
                <span className="text-sm">{msg}</span>
                <button
                  onClick={() => handleDelete(n._id)}
                  className="text-green-500 text-xs ml-2"
                >
                  <CheckCheck />
                </button>
              </div>
            )
          )
        )
      )}
    </div>
  );
};

export default NotificationList;
