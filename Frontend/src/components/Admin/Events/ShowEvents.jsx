import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShowEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:9999/admin/events");
        setEvents(response.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
        setError("Something went wrong while fetching events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/event/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id); // Optional: show loading or disable button
      const res=await axios.delete(`http://localhost:9999/admin/events/${id}`);
      setEvents((prev) => prev.filter((event) => event._id !== id));
      alert(res.data.message);
    } catch (err) {
      console.error("Failed to delete event", err);
      alert("Failed to delete the event. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Upcoming Events
      </h2>

      {loading && (
        <p className="text-center text-gray-500">Loading events...</p>
      )}
      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!loading && events.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No events available.
          </p>
        )}

        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={event.img}
              alt={event.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {event.title}
              </h3>
              <p className="text-gray-600">📍 {event.location}</p>
              <p className="text-gray-600">📅 {event.date}</p>
              <p className="text-gray-600">
                💸{" "}
                {event.is_free === "yes" || event.is_free === true
                  ? "Free"
                  : `₹${event.ticket_price}`}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(event._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ${
                    deletingId === event._id ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={deletingId === event._id}
                >
                  {deletingId === event._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowEvents;
