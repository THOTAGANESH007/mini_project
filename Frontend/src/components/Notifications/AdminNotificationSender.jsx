// src/components/AdminNotificationSender.js
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNotificationSender = () => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) {
      toast.warn("Please enter a message before sending.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:9999/api/notifications/send",
        { message },
        { withCredentials: true }
      );
      toast.success("Notification sent to users!");
      setMessage("");
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Admin Panel - Send Notification
        </h2>

        <textarea
          rows="5"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none resize-none"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNotificationSender;
