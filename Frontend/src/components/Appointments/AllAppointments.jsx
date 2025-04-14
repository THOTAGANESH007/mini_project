import React from "react";

const AllAppointments = () => {
  // Dummy Data
  const upcomingAppointments = [
    {
      id: 1,
      dept: "Electrical",
      description: "Fix light in Room 202",
      time: "2025-04-15 10:30 AM",
    },
    {
      id: 2,
      dept: "Water_Service",
      description: "Check water pressure issue in Block A",
      time: "2025-04-16 09:00 AM",
    },
  ];

  const completedAppointments = [
    {
      id: 3,
      dept: "Drainage",
      description: "Clean clogged drain near cafeteria",
      time: "2025-04-10 02:00 PM",
    },
    {
      id: 4,
      dept: "Electrical",
      description: "Replaced fan in Room 105",
      time: "2025-04-12 11:15 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">My Appointments</h2>

      <div className="max-w-3xl mx-auto space-y-10">
        {/* Upcoming Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-600">Upcoming Appointments</h3>
          {upcomingAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500 mb-4"
            >
              <p><strong>Category:</strong> {appt.dept}</p>
              <p><strong>Description:</strong> {appt.description}</p>
              <p><strong>Allocated Time:</strong> {appt.time}</p>
            </div>
          ))}
        </div>

        {/* Completed Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Completed Appointments</h3>
          {completedAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-gray-500 mb-4"
            >
              <p><strong>Category:</strong> {appt.dept}</p>
              <p><strong>Description:</strong> {appt.description}</p>
              <p><strong>Allocated Time:</strong> {appt.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
