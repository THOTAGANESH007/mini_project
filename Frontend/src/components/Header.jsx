import React, { useEffect, useState } from "react";
import "../index.css"; // Assuming this has header styles
import { Link, useNavigate } from "react-router-dom";
import { BellDot, LogOut, User, Menu, X } from "lucide-react"; // Added Menu, X
import { useDispatch } from "react-redux";
import axios from "axios";
import NotificationList from "./Notifications/NotificationList";
import { toast, ToastContainer } from "react-toastify";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

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
        setIsMobileMenuOpen(false); // Close mobile menu on logout
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
              className="text-2xl sm:text-3xl lg:text-4xl font-bold"
              onClick={closeMobileMenu}
            >
              UrbanPulse
            </Link>
          </h1>
        </div>

        {/* Desktop Menu */}
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

          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-white text-xl hover:text-gray-300 cursor-pointer"
            >
              <BellDot />
            </div>
            {showDropdown && <NotificationList />}
          </div>

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
                <ul className="absolute right-0 mt-2 w-44 bg-white border text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 invisible">
                  <li className="px-3 py-1 mx-2 my-2 text-sm bg-blue-200 rounded text-center">
                    Welcome, {user.name.split(" ")[0]}
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link
                      to="/profile"
                      className="flex justify-between items-center w-full"
                    >
                      Profile <User size={16} />
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex justify-between items-center w-full"
                    >
                      Logout <LogOut size={16} />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button and Notification Bell */}
        <div className="md:hidden flex items-center gap-3">
          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-white text-xl hover:text-gray-300 cursor-pointer"
            >
              <BellDot />
            </div>
            {showDropdown && <NotificationList />}
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
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
            className="block px-4 py-3 hover:bg-blue-600"
            onClick={closeMobileMenu}
          >
            Events
          </Link>
          <Link
            to="/complaints"
            className="block px-4 py-3 hover:bg-blue-600"
            onClick={closeMobileMenu}
          >
            Complaints
          </Link>
          <Link
            to="/bills"
            className="block px-4 py-3 hover:bg-blue-600"
            onClick={closeMobileMenu}
          >
            Bills
          </Link>
          <Link
            to="/appointments"
            className="block px-4 py-3 hover:bg-blue-600"
            onClick={closeMobileMenu}
          >
            Appointments
          </Link>
          <Link
            to="/tenders"
            className="block px-4 py-3 hover:bg-blue-600"
            onClick={closeMobileMenu}
          >
            Tenders
          </Link>

          <div className="border-t border-blue-500 mt-2 pt-2">
            {!user && (
              <div className="px-4 py-1">
                <Link
                  to={"/auth"}
                  className="block py-2 my-1 hover:bg-blue-600 rounded"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="block py-2 my-1 hover:bg-blue-600 rounded"
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
                  className="block py-2 my-1 hover:bg-blue-600 rounded"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 my-1 hover:bg-blue-600 rounded"
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
