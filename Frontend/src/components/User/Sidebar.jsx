import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  Calendar,
  CreditCard,
  LogOut,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:9999/api/user/logout", {
        withCredentials: true,
      });

      if (res.data.message) {
        localStorage.removeItem("user");
      toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navigation = [
    {
      group: "User Dashboard",
      items: [
        {
          name: "Complaints",
          path: "/user/complaints",
          icon: <FileText size={18} />,
        },
        {
          name: "Appointments",
          path: "/user/appointment",
          icon: <Calendar size={18} />,
        },
        {
          name: "Bills",
          path: "/user/bills",
          icon: <CreditCard size={18} />,
        },
      ],
    },
  ];

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  if (!user) return null;

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <ToastContainer
           position="top-center"
           autoClose={3000}
           hideProgressBar={false}
           closeOnClick
           pauseOnHover
           draggable
           pauseOnFocusLoss
         />
      <button
        aria-label="Toggle Sidebar"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-md"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-40 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ width: isOpen ? "16rem" : "4rem" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 border-b border-gray-800 px-4">
          <div className="flex items-center space-x-4">
            {user?.profile ? (
              <img
                src={user.profile}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <h1
              className={`font-bold transition-opacity duration-200 ${
                isOpen ? "opacity-100" : "opacity-0 md:opacity-0"
              }`}
            >
              {user.name}
            </h1>
          </div>
          <button
            aria-label="Logout"
            onClick={handleLogout}
            className="text-gray-400 hover:text-white"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-2">
          {navigation.map((navGroup, index) => (
            <div key={index} className="mb-6">
              <div
                className={`flex items-center text-gray-400 ${
                  isOpen ? "px-2" : "justify-center"
                }`}
              >
                <span
                  className={`text-sm font-medium transition-opacity duration-200 ${
                    isOpen ? "opacity-100" : "opacity-0 hidden"
                  }`}
                >
                  {navGroup.group}
                </span>
              </div>

              <div className="space-y-1 mt-2">
                {navGroup.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.path}
                    className={`
                      flex items-center px-2 py-2 text-sm rounded-md transition-colors
                      ${
                        isActive(item.path)
                          ? "bg-indigo-800 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }
                      ${isOpen ? "justify-start" : "justify-center"}
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span
                      className={`transition-opacity duration-200 ${
                        isOpen ? "opacity-100" : "opacity-0 hidden"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse Button (Desktop only) */}
        <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">
          <button
            aria-label="Collapse Sidebar"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-center w-full text-sm text-gray-400 hover:text-white transition-colors ${
              isOpen ? "" : "hidden md:flex"
            }`}
          >
            <span
              className={`transition-opacity duration-200 ${
                isOpen ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <ArrowLeft size={20} />
            </span>
            <span className={`${isOpen ? "hidden" : "hidden md:block"}`}>
              <ArrowRight size={20} />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
