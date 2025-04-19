import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { BellDot, LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9999/api/notifications/${user._id}`,
        {
          withCredentials: true,
        }
      );
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const handleDelete = async (notificationId, messageIndex) => {
    try {
      await axios.delete(
        `http://localhost:9999/api/notifications/${notificationId}/${messageIndex}`,
        { withCredentials: true }
      );
      fetchNotifications(); // Refresh list
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:9999/api/user/logout", {
        withCredentials: true,
      });

      if (res.data.message) {
        localStorage.removeItem("user");
        alert(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, []);

  return (
    <div className="sticky top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-6 py-3 header">
        <div className="flex items-center">
          <h1 className="text-white font-semibold">
            <Link to="/" className="text-4xl font-bold">
              UrbanPulse
            </Link>
          </h1>
        </div>

        <div className="flex items-center gap-x-6 relative">
          <Link to="/events" className="text-white text-xl hover:text-gray-300">
            Events
          </Link>
          <Link
            to="/complaints"
            className="text-white text-xl hover:text-gray-300"
          >
            Complaints
          </Link>
          <Link to="/bills" className="text-white text-xl hover:text-gray-300">
            Bills
          </Link>
          <Link
            to="/appointments"
            className="text-white text-xl hover:text-gray-300"
          >
            Appointments
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-white text-xl hover:text-gray-300 cursor-pointer"
            >
              <BellDot />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-md shadow-lg p-4 z-50 max-h-96 overflow-y-auto">
                <h3 className="font-semibold text-lg mb-2">Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-500">No notifications.</p>
                ) : (
                  notifications.map((n) =>
                    n.message.map((msg, idx) => (
                      <div
                        key={`${n._id}-${idx}`}
                        className="flex justify-between items-center border-b py-1"
                      >
                        <span className="text-sm">{msg}</span>
                        <button
                          onClick={() => handleDelete(n._id, idx)}
                          className="text-red-500 text-xs ml-2"
                        >
                          ✖
                        </button>
                      </div>
                    ))
                  )
                )}
              </div>
            )}
          </div>

          {!user && (
            <div className="flex gap-2">
              <button className="text-white border border-white px-4 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition">
                <Link to={"/auth"}>Login</Link>
              </button>
              <button className="text-white border border-white px-4 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition">
                <Link to={"/signup"}>Signup</Link>
              </button>
            </div>
          )}

          {user && (
            <div className="relative group flex items-center gap-2">
              <div className="relative group">
                <img
                  alt="User Photo"
                  src={user.profile || "https://via.placeholder.com/40"}
                  className="w-10 h-10 rounded-full ring-2 ring-white object-cover"
                />
                <ul className="absolute right-0 mt-2 w-44 bg-white border text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 invisible">
                  <li className="mx-5 my-2 text-sm bg-blue-300 rounded">
                    Welcome, {user.name}
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link
                      to="/profile"
                      className="flex justify-between items-center w-full"
                    >
                      Profile
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        <User />
                      </span>
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link onClick={handleLogout} className="block w-full">
                      <span className="flex items-center gap-2">
                        Logout <LogOut />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;