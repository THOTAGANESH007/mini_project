import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentsPage = () => {
  const [dept, setDept] = useState("");
  const [description, setDescription] = useState("");
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dept && description) {
      const newAppointment = {
        id: Date.now(), // used as timestamp
        dept,
        description,
      };
      setAppointments([...appointments, newAppointment]);
      setDept("");
      setDescription("");
      alert("Appointment booked!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleViewAppointments = () => {
    navigate("/appointments/all", {
      state: { appointments },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Book an Appointment</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        {/* Department Dropdown */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Department</label>
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Department</option>
            <option value="Electrical">Electrical</option>
            <option value="Drainage">Drainage</option>
            <option value="Water_Service">Water Service</option>
          </select>
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of your issue..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>

        {/* Buttons Row */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Book Appointment
          </button>

          <button
            type="button"
            onClick={handleViewAppointments}
            className="w-1/2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            View My Appointments
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentsPage;
