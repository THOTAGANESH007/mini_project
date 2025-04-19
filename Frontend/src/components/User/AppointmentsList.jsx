import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // import Link
// ...

const AppointmentsList = () => {
  const department = 'Electrical'; // This can also come from useParams if needed
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:9999/api/appointments/department/${department}`
        );
        const data = await response.json();

        if (response.ok) {
          setAppointments(data);
        } else {
          setError(data.error || "Failed to fetch appointments");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [department]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Appointments for {department.replace("_", " ")}
      </h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <Link
              key={appt._id}
              to={`${appt._id}`}
              className="block"
            >
              <div className="bg-white rounded-xl p-4 shadow-md border hover:bg-gray-100 transition">
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {appt.description}
                </p>
                <p>
                  <span className="font-semibold">User ID:</span> {appt.userId}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
