import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AppointmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`http://localhost:9999/api/appointments/${id}`);
        const data = await res.json();

        if (res.ok) {
          setAppointment(data);
        } else {
          setError(data.error || "Failed to fetch appointment");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleApprove = async () => {
    try {
      const res = await fetch(
        `http://localhost:9999/api/appointments/approve/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appointmentDate,
            appointmentTime,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Appointment approved successfully!");
        navigate(-1);
        setAppointment(data.appointment);
      } else {
        setError(data.error || "Failed to approve appointment");
      }
    } catch (err) {
      console.error("Approval error:", err);
      setError("Something went wrong during approval");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-700 font-medium">Loading appointment details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-center">
          <div className="bg-red-100 p-3 rounded-full">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-medium text-center mt-4 text-gray-900">Error</h3>
        <p className="text-center mt-2 text-gray-600">{error}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-6 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-blue-600 p-6">
          <button 
            onClick={() => navigate(-1)}
            className="text-blue-100 hover:text-white transition duration-200 flex items-center mb-4"
          >
            <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Appointments
          </button>
          <h2 className="text-2xl font-bold text-white">Appointment Details</h2>
          <p className="text-blue-100 mt-1">ID: {id}</p>
        </div>
        
        <div className="p-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-blue-700 font-medium">User ID</p>
                <p className="text-gray-800">{appointment.userId}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">Description</p>
                <p className="text-gray-800">{appointment.description}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.appointmentStatus === "pending" ? "bg-yellow-100 text-yellow-800" : 
                  appointment.appointmentStatus === "approved" ? "bg-green-100 text-green-800" : 
                  "bg-gray-100 text-gray-800"
                }`}>
                  {appointment.appointmentStatus}
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">Schedule Appointment</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">
                Appointment Date
              </label>
              <input
                id="date"
                type="date"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="time">
                Appointment Time
              </label>
              <input
                id="time"
                type="time"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleApprove}
            disabled={!appointmentDate || !appointmentTime}
            className={`mt-6 w-full py-3 px-4 rounded-lg font-medium text-white transition duration-200 ${
              !appointmentDate || !appointmentTime 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Approve Appointment
          </button>

          {successMessage && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-start">
              <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{successMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;