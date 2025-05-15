import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BellOff, CheckCircle } from "lucide-react";

const NotificationList = ({
  notifications: initialNotifications,
  fetchNotifications: refreshNotificationsInHeader,
  onClose,
}) => {
  const [notifications, setNotifications] = useState(initialNotifications || []);
  const [isLoading, setIsLoading] = useState(
    initialNotifications === null || typeof initialNotifications === "undefined"
  );
  const dropdownRef = useRef(null);

  // Fetch if not passed from parent
  useEffect(() => {
    if (initialNotifications === null || typeof initialNotifications === "undefined") {
      const fetchLocalNotifications = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/notifications`, {
            withCredentials: true,
          });
          setNotifications(res.data.data || []);
        } catch (error) {
          console.error("Error fetching notifications:", error);
          setNotifications([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchLocalNotifications();
    } else {
      setNotifications(initialNotifications);
      setIsLoading(false);
    }
  }, [initialNotifications]);

  // Close dropdown on outside click
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       const bellButton = event.target.closest('button[aria-label="Notifications"]');
  //       if (!bellButton && onClose) {
  //         onClose();
  //       }
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [onClose]);

  // Mark one notification as read
  const handleMarkAsRead = async (notificationId) => {
    

    const originalNotifications = [...notifications];
    setNotifications((prev) => prev.filter((n) => n._id !== notificationId));

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/notifications/read`,
        { notificationId },
        { withCredentials: true }
      );

      if (response.status === 200 && refreshNotificationsInHeader) {
        refreshNotificationsInHeader();
      } else {
        setNotifications(originalNotifications);
        alert("Could not mark notification as read.");
      }
    } catch (error) {
      console.error("Mark as read error:", error);
      setNotifications(originalNotifications);
      alert("Could not mark notification as read.");
    }
  };

  // Mark all as read
  const handleClearAll = async () => {
    if (notifications.length === 0 || isLoading) return;

    if (window.confirm("Are you sure you want to mark all as read?")) {
      const originalNotifications = [...notifications];
      setNotifications([]);

      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}/api/notifications/read-all`,
          {},
          { withCredentials: true }
        );

        if (response.status === 200 && refreshNotificationsInHeader) {
          refreshNotificationsInHeader();
        } else {
          setNotifications(originalNotifications);
          alert("Could not clear all notifications.");
        }
      } catch (error) {
        console.error("Clear all error:", error);
        setNotifications(originalNotifications);
        alert("Could not clear all notifications.");
      }
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs sm:w-80 md:w-96 bg-white text-gray-800 rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[60vh] sm:max-h-[70vh] flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
        <h3 className="font-semibold text-base sm:text-lg">Notifications</h3>
        {notifications.length > 0 && !isLoading && (
          <button
            onClick={handleClearAll}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium p-1 rounded hover:bg-blue-50 cursor-pointer"
            title="Clear all notifications"
          >
            Clear All
          </button>
        )}
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-grow p-1">
        {isLoading ? (
          <p className="text-sm text-gray-500 text-center py-10">Loading...</p>
        ) : notifications.length === 0 ? (
          <div className="text-center py-8 px-4">
            <BellOff size={36} className="mx-auto text-gray-400 mb-3" />
            <p className="text-sm text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {notifications.map((n) => (
              <li
                key={n._id}
                className="px-3 py-2.5 hover:bg-gray-50 transition-colors duration-150 group"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-grow min-w-0">
                    <p className="text-sm text-gray-700 leading-snug break-words">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.createdAt).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                      <span className="mx-1">·</span>
                      {new Date(n.createdAt).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <button
  onClick={(e) => {
    e.stopPropagation();
    handleMarkAsRead(n._id);
  }}
  title="Mark as read"
  className="text-gray-400 hover:text-green-600 p-1.5 rounded-full hover:bg-green-100 flex-shrink-0 cursor-pointer transition"
>
  <CheckCircle size={16} />
</button>

                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
