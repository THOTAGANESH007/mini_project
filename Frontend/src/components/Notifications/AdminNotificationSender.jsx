// src/components/AdminNotificationSender.js
import React, { useState } from "react";
import axios from "axios";

const AdminNotificationSender = () => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      await axios.post("http://localhost:9999/api/notifications/send", {
        message: [message],
      });
      alert("Notification sent to users!");
      setMessage("");
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin Panel - Send Notification</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default AdminNotificationSender;
