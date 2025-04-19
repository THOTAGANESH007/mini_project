import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const AppointmentDetails = () => {
    const navigate=useNavigate();
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

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="max-w-xl p-6 mx-auto bg-white shadow-md rounded-xl"
    >
      <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
      <p>
        <span className="font-semibold">User ID:</span> {appointment.userId}
      </p>
      <p>
        <span className="font-semibold">Description:</span>{" "}
        {appointment.description}
      </p>
      <p>
        <span className="font-semibold">Status:</span>{" "}
        {appointment.appointmentStatus}
      </p>

      {/* Appointment Date */}
      <div className="mt-6">
        <label className="block font-semibold mb-1" htmlFor="date">
          Appointment Date
        </label>
        <input
          id="date"
          type="date"
          className="w-full border border-gray-300 rounded-md p-2"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
      </div>

      {/* Appointment Time */}
      <div className="mt-4">
        <label className="block font-semibold mb-1" htmlFor="time">
          Appointment Time
        </label>
        <input
          id="time"
          type="time"
          className="w-full border border-gray-300 rounded-md p-2"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
        />
      </div>

      {/* Approve Button */}
      <button
        onClick={handleApprove}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Approve Appointment
      </button>

      {/* Success Message */}
      {successMessage && (
        <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
      )}
    </div>
  );
};

export default AppointmentDetails;
