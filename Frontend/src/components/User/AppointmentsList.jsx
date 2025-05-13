import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AppointmentsList = () => {
  // This can also come from useParams if needed
  const department = JSON.parse(localStorage.getItem("user")).role;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/appointments/department/${department}`,
          { withCredentials: true }
        );
        const data = res.data.data;
        console.log("all appointment by department", data);
        if (data) {
          setAppointments(data);
        } else {
          setError(res.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">
            Loading appointments...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {department} Department Appointments
          </h2>
          <p className="text-gray-600 mt-2">
            Manage and view all scheduled appointments
          </p>
        </header>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-md text-center">
            <svg
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg mb-4">No appointments found</p>
            <p className="text-gray-500">
              There are currently no appointments scheduled for the {department}{" "}
              department.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {appointments.map((appt) => (
              <Link key={appt._id} to={`${appt._id}`} className="block">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-100 transition duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {department}
                    </div>
                    <div className="text-gray-400 text-sm">
                      ID: {appt._id.substring(0, 8)}...
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">
                    {appt.description}
                  </h3>
                  <div className="flex items-center mt-4 text-gray-600">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>User: {appt.userId}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
