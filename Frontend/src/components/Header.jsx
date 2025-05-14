import React, { useEffect, useState } from "react";
import "../index.css"; // Assuming this has header styles
import { Link, useNavigate } from "react-router-dom";
import { BellDot, LogOut, User, Menu, X } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import NotificationList from "./Notifications/NotificationList"; // Ensure this path is correct
import { toast, ToastContainer } from "react-toastify";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchNotificationsData = async () => {
    if (!user) return; // Don't fetch if no user
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/notifications`,
        { withCredentials: true }
      );
      const fetchedNotifications = data.data || [];
      setNotifications(fetchedNotifications);
      // Simple unread count based on fetched notifications;
      // ideally, backend would provide a specific unread count or isRead flag.
      setUnreadCount(fetchedNotifications.length);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    fetchNotificationsData(); // Fetch on initial load if user exists
  }, [user]); // Re-fetch if user changes

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/logout`,
        {
          withCredentials: true,
        }
      );

      if (res.data.message) {
        localStorage.removeItem("user");
        toast.success(res.data.message);
        setIsMobileMenuOpen(false);
        setShowNotificationDropdown(false); // Close notification dropdown on logout
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleNotificationDropdown = () => {
    if (!showNotificationDropdown) {
      fetchNotificationsData(); // Refresh notifications when opening the dropdown
    }
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  return (
    <div className="sticky top-0 left-0 w-full z-50">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <nav className="flex items-center justify-between px-4 sm:px-6 py-3 header">
        {" "}
        {/* `header` class from index.css */}
        <div className="flex items-center">
          <h1 className="text-white font-semibold">
            <Link
              to="/"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold"
              onClick={() => {
                closeMobileMenu();
                setShowNotificationDropdown(false);
              }}
            >
              UrbanPulse
            </Link>
          </h1>
        </div>
        {/* Desktop Menu & Notifications */}
        <div className="hidden md:flex items-center gap-x-3 lg:gap-x-6 relative">
          <Link
            to="/events"
            className="text-white text-base lg:text-xl hover:text-gray-300"
          >
            Events
          </Link>
          <Link
            to="/complaints"
            className="text-white text-base lg:text-xl hover:text-gray-300"
          >
            Complaints
          </Link>
          <Link
            to="/bills"
            className="text-white text-base lg:text-xl hover:text-gray-300"
          >
            Bills
          </Link>
          <Link
            to="/appointments"
            className="text-white text-base lg:text-xl hover:text-gray-300"
          >
            Appointments
          </Link>
          <Link
            to="/tenders"
            className="text-white text-base lg:text-xl hover:text-gray-300"
          >
            Tenders
          </Link>

          {user && ( // Show notification bell only if user is logged in
            <div className="relative">
              <button
                onClick={toggleNotificationDropdown}
                className="text-white text-xl hover:text-gray-300 cursor-pointer p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-label="Notifications"
              >
                <BellDot size={24} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              {showNotificationDropdown && (
                <NotificationList
                  notifications={notifications}
                  fetchNotifications={fetchNotificationsData}
                  onClose={() => setShowNotificationDropdown(false)} // Prop to close dropdown
                />
              )}
            </div>
          )}

          {!user && (
            <div className="flex gap-2">
              <button className="text-white border border-white px-3 py-1 lg:px-4 rounded-lg hover:bg-white hover:text-blue-600 transition text-sm lg:text-base">
                <Link to={"/auth"}>Login</Link>
              </button>
              <button className="text-white border border-white px-3 py-1 lg:px-4 rounded-lg hover:bg-white hover:text-blue-600 transition text-sm lg:text-base">
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
                <ul className="absolute right-0 mt-2 w-48 bg-white border text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 invisible">
                  <li className="px-3 py-2 mx-2 my-2 text-sm bg-blue-100 rounded text-center font-medium">
                    Welcome, {user.name.split(" ")[0]}
                  </li>
                  <li className="hover:bg-gray-100">
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 flex justify-between items-center w-full"
                    >
                      Profile <User size={16} />
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2.5 flex justify-between items-center"
                    >
                      Logout <LogOut size={16} />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        {/* Mobile Area: Notification Bell + Hamburger Menu */}
        <div className="md:hidden flex items-center gap-2 sm:gap-3">
          {user && ( // Show notification bell only if user is logged in
            <div className="relative">
              <button
                onClick={toggleNotificationDropdown}
                className="text-white text-xl hover:text-gray-300 cursor-pointer p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-label="Notifications"
              >
                <BellDot size={24} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              {showNotificationDropdown && (
                <NotificationList
                  notifications={notifications}
                  fetchNotifications={fetchNotificationsData}
                  onClose={() => setShowNotificationDropdown(false)}
                />
              )}
            </div>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 text-white absolute w-full shadow-lg z-40 py-2">
          <Link
            to="/events"
            className="block px-4 py-3 hover:bg-blue-600 transition-colors"
            onClick={closeMobileMenu}
          >
            Events
          </Link>
          <Link
            to="/complaints"
            className="block px-4 py-3 hover:bg-blue-600 transition-colors"
            onClick={closeMobileMenu}
          >
            Complaints
          </Link>
          <Link
            to="/bills"
            className="block px-4 py-3 hover:bg-blue-600 transition-colors"
            onClick={closeMobileMenu}
          >
            Bills
          </Link>
          <Link
            to="/appointments"
            className="block px-4 py-3 hover:bg-blue-600 transition-colors"
            onClick={closeMobileMenu}
          >
            Appointments
          </Link>
          <Link
            to="/tenders"
            className="block px-4 py-3 hover:bg-blue-600 transition-colors"
            onClick={closeMobileMenu}
          >
            Tenders
          </Link>

          <div className="border-t border-blue-500 mt-2 pt-2">
            {!user && (
              <div className="px-4 py-1">
                <Link
                  to={"/auth"}
                  className="block py-3 my-1 hover:bg-blue-600 rounded transition-colors"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="block py-3 my-1 hover:bg-blue-600 rounded transition-colors"
                  onClick={closeMobileMenu}
                >
                  Signup
                </Link>
              </div>
            )}
            {user && (
              <div className="px-4 py-1">
                <Link
                  to="/profile"
                  className="block py-3 my-1 hover:bg-blue-600 rounded transition-colors"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-3 my-1 hover:bg-blue-600 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
