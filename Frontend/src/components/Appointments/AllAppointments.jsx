import React, { useEffect, useState } from "react";
import axios from "axios";

const AllAppointments = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:9999/api/appointments/byUser", {
          withCredentials: true, // Important if using cookies for auth
        });

        const acceptedAppointments = res.data.filter(
          (appt) => appt.appointmentStatus === "Accepted"
        );
        console.log(acceptedAppointments);
        const now = new Date();

        const upcoming = [];
        const completed = [];

        acceptedAppointments.forEach((appt) => {
          const apptTime = new Date(appt.appointmentDate); // assuming ISO format from backend
          if (apptTime > now) {
            upcoming.push(appt);
          } else {
            completed.push(appt);
          }
        });

        setUpcomingAppointments(upcoming);
        setCompletedAppointments(completed);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">My Appointments</h2>

      <div className="max-w-3xl mx-auto space-y-10">
        {/* Upcoming Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-600">Upcoming Appointments</h3>
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500 mb-4"
              >
                <p><strong>Department:</strong> {appt.department}</p>
                <p><strong>Description:</strong> {appt.description}</p>
                <p><strong>Allocated Time:</strong> {new Date(appt.appointmentDate).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
        </div>

        {/* Completed Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Completed Appointments</h3>
          {completedAppointments.length > 0 ? (
            completedAppointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white p-4 rounded-lg shadow border-l-4 border-gray-500 mb-4"
              >
                <p><strong>Category:</strong> {appt.dept}</p>
                <p><strong>Description:</strong> {appt.description}</p>
                <p><strong>Allocated Time:</strong> {new Date(appt.appointmentDate).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No completed appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
