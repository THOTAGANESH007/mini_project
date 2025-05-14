import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCheck, BellOff } from "lucide-react"; // Added BellOff

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/notifications`,
        {
          withCredentials: true,
        }
      );
      setNotifications(res.data.data || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]); // Set to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/notifications`,
        {
          data: { notificationId }, // Send ID in body for DELETE
          withCredentials: true,
        }
      );
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="absolute right-0 mt-2 w-full max-w-xs sm:w-80 bg-white text-black rounded-md shadow-lg p-4 z-50 max-h-80 sm:max-h-96 overflow-y-auto">
      <h3 className="font-semibold text-lg mb-3 border-b pb-2">
        Notifications
      </h3>
      {isLoading ? (
        <p className="text-sm text-gray-500 text-center py-4">Loading...</p>
      ) : notifications.length === 0 ? (
        <div className="text-center py-6">
          <BellOff size={32} className="mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">No new notifications.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {notifications.map((n) =>
            (Array.isArray(n.message) ? n.message : [n.message]).map(
              (msg, idx) => (
                <li
                  key={`${n._id}-${idx}`}
                  className="py-2.5 flex justify-between items-center group"
                >
                  <span className="text-sm text-gray-700 leading-tight flex-1 pr-2">
                    {msg}
                  </span>
                  <button
                    onClick={() => handleDelete(n._id)}
                    title="Mark as read"
                    className="text-gray-400 hover:text-green-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  >
                    <CheckCheck size={18} />
                  </button>
                </li>
              )
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
