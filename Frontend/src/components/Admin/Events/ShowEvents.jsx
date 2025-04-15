import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Music Fiesta",
      location: "Mumbai",
      date: "2025-05-10",
      is_free: "no",
      ticket_price: "500",
      img: "https://source.unsplash.com/featured/?music-concert",
    },
    {
      id: 2,
      name: "Art Exhibition",
      location: "Delhi",
      date: "2025-06-15",
      is_free: "yes",
      ticket_price: "",
      img: "https://source.unsplash.com/featured/?art",
    },
    {
      id: 3,
      name: "Tech Talk",
      location: "Bangalore",
      date: "2025-07-01",
      is_free: "no",
      ticket_price: "100",
      img: "https://source.unsplash.com/featured/?technology",
    },
  ]);

  const handleEdit = (id) => {
    navigate(`/admin/event/edit/${id}`);
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Upcoming Events
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={event.img}
              alt={event.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {event.name}
              </h3>
              <p className="text-gray-600">📍 {event.location}</p>
              <p className="text-gray-600">📅 {event.date}</p>
              <p className="text-gray-600">
                💸{" "}
                {event.is_free === "yes"
                  ? "Free"
                  : `₹${event.ticket_price}`}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(event.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
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
