import React, { useEffect, useState } from "react";
import "../index.css"; // Contains .header class
import { Link, useNavigate } from "react-router-dom";
import { BellDot, LogOut, User, Menu, X } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import NotificationList from "./Notifications/NotificationList";
import { toast, ToastContainer } from "react-toastify";
import { clearUser } from "../utils/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Robust User Parsing ---
  let initialUser = null;
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      initialUser = JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      // localStorage.removeItem("user"); // Optionally remove corrupted item
    }
  }
  // The 'user' variable will be derived from this logic on every render.
  const user = initialUser;
  // --- End Robust User Parsing ---

  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileUserProfileOpen, setIsMobileUserProfileOpen] = useState(false);

  const fetchNotificationsData = async () => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoadingNotifications(false);
      return;
    }

    // setIsLoadingNotifications(true); // This is now set in toggleNotificationDropdown before calling
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/notifications`;
      if (!import.meta.env.VITE_API_BASE_URL) {
        console.error(
          "VITE_API_BASE_URL is not defined. Cannot fetch notifications."
        );
        toast.error("Application configuration error. Please contact support.");
        throw new Error("API base URL not configured");
      }
      const { data } = await axios.get(apiUrl, { withCredentials: true });
      const fetchedNotifications = data.data || [];
      //console.log("Fetched notifications:", fetchedNotifications);
      setNotifications(fetchedNotifications);
      setUnreadCount(fetchedNotifications.length);
    } catch (error) {
      // console.error("Failed to fetch notifications:", error.message);
      if (error.message !== "API base URL not configured") {
        // Avoid double toast
        // toast.error("Could not load notifications.");
      }
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  useEffect(() => {
    if (user) {
      // Optionally, you might want to fetch notifications when the user logs in or app loads.
      // If so, ensure isLoadingNotifications is set to true before this call.
      // For instance:
      // setIsLoadingNotifications(true);
      // fetchNotificationsData();
      // For now, we'll rely on the bell click to initiate fetch.
    } else {
      // Clear notifications if user logs out or is not present
      setNotifications([]);
      setUnreadCount(0);
      setShowNotificationDropdown(false); // Close dropdown if user logs out
      setIsLoadingNotifications(false);
    }
  }, [user]); // Re-run if the user object identity changes

  const handleLogout = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/user/logout`;
      if (!import.meta.env.VITE_API_BASE_URL) {
        console.error("VITE_API_BASE_URL is not defined. Cannot logout.");
        toast.error("Application configuration error for logout.");
        // Still attempt local cleanup
        localStorage.removeItem("user");
        dispatch(clearUser());
        closeAllDropdownsAndMenus();
        navigate("/");
        return;
      }
      const res = await axios.get(apiUrl, { withCredentials: true });

      if (res.data.message) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      localStorage.removeItem("user");
      dispatch(clearUser());
      closeAllDropdownsAndMenus();
      navigate("/");
    }
  };

  const closeAllDropdownsAndMenus = () => {
    setIsMobileMenuOpen(false);
    setShowNotificationDropdown(false);
    setIsMobileUserProfileOpen(false);
  };

  const toggleNotificationDropdown = () => {
    const isOpening = !showNotificationDropdown;

    if (isOpening) {
      if (user) {
        setIsLoadingNotifications(true); // Set loading true BEFORE showing
        setShowNotificationDropdown(true); // Then show
        fetchNotificationsData(); // Then fetch (fetchNotificationsData will set isLoading to false)
      } else {
        // No user, so show empty state, not loading
        setNotifications([]);
        setUnreadCount(0);
        setIsLoadingNotifications(false);
        setShowNotificationDropdown(true);
      }
    } else {
      // Closing the dropdown
      setShowNotificationDropdown(false);
    }

    // Close other mobile menus when toggling notifications
    setIsMobileMenuOpen(false);
    setIsMobileUserProfileOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setShowNotificationDropdown(false);
    setIsMobileUserProfileOpen(false);
  };

  const toggleMobileUserProfile = () => {
    setIsMobileUserProfileOpen((prev) => !prev);
    setShowNotificationDropdown(false);
    setIsMobileMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (!user) return "Guest";
    if (user.name && typeof user.name === "string") {
      return user.name.split(" ")[0];
    }
    if (user.username && typeof user.username === "string") {
      return user.username;
    }
    return "User";
  };
  const displayName = getUserDisplayName();

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
        <div className="flex items-center">
          <h1 className="text-white font-semibold">
            <Link
              to="/"
              className="text-xl sm:text-2xl lg:text-3xl font-bold"
              onClick={closeAllDropdownsAndMenus}
            >
              UrbanPulse
            </Link>
          </h1>
        </div>

        {/* Desktop Menu & Notifications */}
        <div className="hidden md:flex items-center gap-x-2 lg:gap-x-4 relative">
          <Link
            to="/events"
            className="text-white text-sm lg:text-lg hover:text-gray-200 px-2 py-1 rounded-md"
            onClick={closeAllDropdownsAndMenus}
          >
            Events
          </Link>
          <Link
            to="/complaints"
            className="text-white text-sm lg:text-lg hover:text-gray-200 px-2 py-1 rounded-md"
            onClick={closeAllDropdownsAndMenus}
          >
            Complaints
          </Link>
          <Link
            to="/bills"
            className="text-white text-sm lg:text-lg hover:text-gray-200 px-2 py-1 rounded-md"
            onClick={closeAllDropdownsAndMenus}
          >
            Bills
          </Link>
          <Link
            to="/appointments"
            className="text-white text-sm lg:text-lg hover:text-gray-200 px-2 py-1 rounded-md"
            onClick={closeAllDropdownsAndMenus}
          >
            Appointments
          </Link>
          <Link
            to="/tenders"
            className="text-white text-sm lg:text-lg hover:text-gray-200 px-2 py-1 rounded-md"
            onClick={closeAllDropdownsAndMenus}
          >
            Tenders
          </Link>

          {user && (
            <div className="relative">
              <button
                onClick={toggleNotificationDropdown}
                className="text-white hover:text-gray-200 cursor-pointer p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-label="Notifications"
              >
                <BellDot size={22} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              {showNotificationDropdown && (
                <NotificationList
                  notifications={notifications}
                  fetchNotifications={fetchNotificationsData}
                  onClose={() => setShowNotificationDropdown(false)}
                  isLoading={isLoadingNotifications}
                />
              )}
            </div>
          )}

          {!user && (
            <div className="flex gap-2 ml-2">
              <Link to={"/auth"} onClick={closeAllDropdownsAndMenus}>
                <button className="text-white border border-white px-3 py-1.5 rounded-lg hover:bg-white hover:text-blue-600 transition text-xs lg:text-sm">
                  Login
                </button>
              </Link>
              <Link to={"/signup"} onClick={closeAllDropdownsAndMenus}>
                <button className="text-white border border-white px-3 py-1.5 rounded-lg hover:bg-white hover:text-blue-600 transition text-xs lg:text-sm">
                  Signup
                </button>
              </Link>
            </div>
          )}

          {user && (
            <div className="relative group flex items-center gap-2 ml-2">
              <div className="relative group">
                <img
                  alt="User Photo"
                  src={
                    user.profile && typeof user.profile === "string"
                      ? user.profile
                      : "https://via.placeholder.com/36"
                  }
                  className="w-9 h-9 rounded-full ring-2 ring-white object-cover cursor-pointer"
                />
                <ul className="absolute right-0 mt-2 w-44 bg-white border text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 invisible">
                  <li className="px-3 py-2 mx-2 my-1 text-xs bg-blue-100 rounded text-center font-medium truncate">
                    Welcome, {displayName}
                  </li>
                  <li className="hover:bg-gray-100 text-xs">
                    <Link
                      to="/profile"
                      className="block px-3 py-2 flex justify-between items-center w-full"
                      onClick={closeAllDropdownsAndMenus}
                    >
                      Profile <User size={14} />
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100 text-xs">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 flex justify-between items-center"
                    >
                      Logout <LogOut size={14} />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Area */}
        <div className="md:hidden flex items-center gap-2 sm:gap-3">
          {user && (
            <>
              <div className="relative">
                <button
                  onClick={toggleNotificationDropdown}
                  className="text-white hover:text-gray-200 cursor-pointer p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label="Notifications"
                >
                  <BellDot size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
                {showNotificationDropdown && (
                  <NotificationList
                    notifications={notifications}
                    fetchNotifications={fetchNotificationsData}
                    onClose={() => setShowNotificationDropdown(false)}
                    isLoading={isLoadingNotifications}
                  />
                )}
              </div>

              <div className="relative">
                <button
                  onClick={toggleMobileUserProfile}
                  aria-label="User menu"
                  className="focus:outline-none p-1 rounded-full focus:ring-2 focus:ring-white focus:ring-opacity-50"
                >
                  <img
                    alt="User Photo"
                    src={
                      user.profile && typeof user.profile === "string"
                        ? user.profile
                        : "https://via.placeholder.com/32"
                    }
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-1 ring-white object-cover"
                  />
                </button>
                {isMobileUserProfileOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-blue-700 border border-blue-600 text-white rounded-md shadow-lg z-50 py-1">
                    <li className="px-3 pt-2 pb-1 text-xs text-center border-b border-blue-500 font-medium">
                      Hi, {displayName}
                    </li>
                    <li className="hover:bg-blue-600 text-xs transition-colors">
                      <Link
                        to="/profile"
                        className="block px-3 py-2 flex justify-between items-center w-full"
                        onClick={closeAllDropdownsAndMenus}
                      >
                        Profile <User size={14} />
                      </Link>
                    </li>
                    <li className="hover:bg-blue-600 text-xs transition-colors">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 flex justify-between items-center"
                      >
                        Logout <LogOut size={14} />
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}

          <button
            onClick={toggleMobileMenu}
            className="text-white p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Toggle main menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Main Navigation Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-white absolute w-full shadow-lg z-40 py-1">
          <Link
            to="/events"
            className="block px-4 py-2.5 hover:bg-blue-600 transition-colors text-sm"
            onClick={closeAllDropdownsAndMenus}
          >
            Events
          </Link>
          <Link
            to="/complaints"
            className="block px-4 py-2.5 hover:bg-blue-600 transition-colors text-sm"
            onClick={closeAllDropdownsAndMenus}
          >
            Complaints
          </Link>
          <Link
            to="/bills"
            className="block px-4 py-2.5 hover:bg-blue-600 transition-colors text-sm"
            onClick={closeAllDropdownsAndMenus}
          >
            Bills
          </Link>
          <Link
            to="/appointments"
            className="block px-4 py-2.5 hover:bg-blue-600 transition-colors text-sm"
            onClick={closeAllDropdownsAndMenus}
          >
            Appointments
          </Link>
          <Link
            to="/tenders"
            className="block px-4 py-2.5 hover:bg-blue-600 transition-colors text-sm"
            onClick={closeAllDropdownsAndMenus}
          >
            Tenders
          </Link>

          {!user && (
            <div className="border-t border-white mt-1 pt-1">
              <div className="px-3 py-1">
                <Link
                  to={"/auth"}
                  className="block py-2.5 my-0.5 hover:bg-blue-600 rounded transition-colors text-sm"
                  onClick={closeAllDropdownsAndMenus}
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="block py-2.5 my-0.5 hover:bg-blue-600 rounded transition-colors text-sm"
                  onClick={closeAllDropdownsAndMenus}
                >
                  Signup
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
