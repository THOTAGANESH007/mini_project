import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TenderForm from "./TenderForm";
import AddPlace from "./Places/AddPlace";
import ShowPlaces from "./Places/ShowPlaces";
import EditPlace from "./Places/EditPlace";
import AddEvent from "./Events/AddEvent";
import EditEvent from "./Events/EditEvent";
import ShowEvents from "./Events/ShowEvents";
import AddMember from "./AddMember";
import BillsPage from "./BillsPage";
import ComplaintsPage from "./ComplaintsPage";
import AdminNotificationSender from "../Notifications/AdminNotificationSender";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`transition-all duration-300 flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } p-4`}
      >
        <Outlet />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/admin/allPlaces" replace />}
          />
          <Route path="/tenders" element={<TenderForm />} />
          <Route path="/addPlace" element={<AddPlace />} />
          <Route path="/allPlaces" element={<ShowPlaces />} />
          <Route path="/place/edit/:id" element={<EditPlace />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/event/edit/:id" element={<EditEvent />} />
          <Route path="/allEvents" element={<ShowEvents />} />
          <Route path="/addRepresentative" element={<AddMember />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/notifications" element={<AdminNotificationSender />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
