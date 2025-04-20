// src/components/NotificationList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9999/api/notifications",{withCredintials:true}
      );
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleDelete = async (notificationId, messageIndex) => {
    try {
      await axios.delete(
        `http://localhost:9999/api/notifications/${notificationId}/${messageIndex}`,{withCredentials:true}
      );
      fetchNotifications(); // Refresh list
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>User Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p>
              <strong>User:</strong> {n.userId?.email || "Unknown"}
            </p>
            {n.message.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{msg}</span>
                <button onClick={() => handleDelete(n._id, i)}>❌</button>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationList;
