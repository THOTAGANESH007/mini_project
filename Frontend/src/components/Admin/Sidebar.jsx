import React, { useState,useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  MapPin,
  Calendar,
  Users,
  Receipt,
  MessageSquare,
  Plus,
  List,
  ArrowRight,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import axios from "axios";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const navigate=useNavigate();

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
      alert(res.data.message);
      navigate("/");
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  const navigation = [
    {
      group: "Places",
      icon: <MapPin size={20} />,
      items: [
        {
          name: "Add Place",
          path: "/admin/addPlace",
          icon: <Plus size={18} />,
        },
        {
          name: "All Places",
          path: "/admin/allPlaces",
          icon: <List size={18} />,
        },
      ],
    },
    {
      group: "Events",
      icon: <Calendar size={20} />,
      items: [
        {
          name: "Add Event",
          path: "/admin/addEvent",
          icon: <Plus size={18} />,
        },
        {
          name: "All Events",
          path: "/admin/allEvents",
          icon: <List size={18} />,
        },
      ],
    },
    {
      group: "Management",
      icon: <Users size={20} />,
      items: [
        {
          name: "Add Representative",
          path: "/admin/addRepresentative",
          icon: <Users size={18} />,
        },
        {
          name: "Tenders",
          path: "/admin/tenders",
          icon: <FileText size={18} />,
        },
        { name: "Bills", path: "/admin/bills", icon: <Receipt size={18} /> },
        {
          name: "Complaints",
          path: "/admin/complaints",
          icon: <MessageSquare size={18} />,
        },
      ],
    },
  ];

  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path.includes("/edit/") &&
        location.pathname.includes(path.split("/edit/")[0]))
    );
  };
if(!user)return;
  return (
    <>
      {/* Toggle Button (Mobile) */}
      <button
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
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-40 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 border-b border-gray-800 px-4">
  <div className="flex items-center space-x-4">
    {user?.profile && (
      <img
        src={user.profile}
        alt="User Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
    )}
    <h1
      className={` font-bold transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0 md:opacity-0"
      }`}
    >
      {user.name}
    </h1>
    <Link onClick={handleLogout} className="block w-full ml-34">
                      <span className="flex items-center gap-2">
                         <LogOut />
                      </span>
                    </Link>
    <span
      className={`text-xl font-bold ${
        isOpen ? "hidden" : "hidden md:block"
      }`}
    >
      AP
    </span>
  </div>
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
                <span className="mr-2">{navGroup.icon}</span>
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
              <ArrowLeft/>
            </span>
            <span className={`${isOpen ? "hidden" : "hidden md:block"}`}>
             <ArrowRight/>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
