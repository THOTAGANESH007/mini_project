// src/components/AdminNotificationSender.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNotificationSender = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/notifications/all-users`, {
        withCredentials: true,
      })
      .then((res) => setUsers(res.data.users))
      .catch(() => toast.error("Failed to load users.", { autoClose: 5000 }));
  }, []);

  const toggleUserSelection = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const sendNotification = async () => {
    if (!message.trim() || selectedUserIds.length === 0) {
      toast.warn("Select users and enter a message.", { autoClose: 5000 });
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/notifications/send`,
        { userIds: selectedUserIds, message },
        { withCredentials: true }
      );
      toast.success("Notification sent!", { autoClose: 5000 });
      setMessage("");
      setSelectedUserIds([]);
    } catch (err) {
      console.error(err);
      toast.error("Error sending notification.", { autoClose: 5000 });
    }
  };

  const sendToAll = async () => {
    if (!message.trim()) {
      toast.warn("Enter a message to send to all.", { autoClose: 5000 });
      return;
    }

    const allUserIds = users.map((userId) => userId._id);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/notifications/send`,
        { userIds: allUserIds, message },
        { withCredentials: true }
      );
      toast.success("Notification sent to all users!", { autoClose: 5000 });
      setMessage("");
      setSelectedUserIds([]);
    } catch (err) {
      console.error(err);
      toast.error("Error sending bulk notification.", { autoClose: 5000 });
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
        pauseOnFocusLoss
      />

      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Send Notifications
        </h2>

        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter notification message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />

        <div>
          <h3 className="mt-4 mb-2 font-medium text-lg">Select Users:</h3>
          <div className="max-h-52 overflow-y-auto border border-gray-300 rounded-md p-3 bg-gray-50">
            {users.length === 0 ? (
              <p className="text-gray-500 text-sm">No users found.</p>
            ) : (
              users.map((user) => (
                <label
                  key={user._id}
                  className="flex items-center space-x-2 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user._id)}
                    onChange={() => toggleUserSelection(user._id)}
                    className="accent-blue-500"
                  />
                  <span>
                    {user.name} ({user.email})
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <button
            onClick={sendNotification}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400"
          >
            Send to Selected Users
          </button>
          <button
            onClick={sendToAll}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition focus:ring-2 focus:ring-green-400"
          >
            Send to All Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNotificationSender;
