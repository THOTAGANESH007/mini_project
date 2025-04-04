import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// same mock events from EventList
const allEvents = Array.from({ length: 50 }, (_, i) => ({
  _id: i + 1,
  title: `Event ${i + 1}`,
  description: `Description for event ${i + 1}`,
  location: `City ${i + 1}`,
  date: new Date(2025, 3, (i % 30) + 1),
  is_free: i % 3 === 0,
  ticket_price: i % 3 === 0 ? 0 : Math.floor(Math.random() * 1000 + 100),
}));

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = allEvents.find((e) => e._id === parseInt(id));

  if (!event) {
    return <p className="text-center mt-10 text-red-600">Event not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-sm text-gray-600">Location: {event.location}</p>
      <p className="text-sm text-gray-600">
        Date: {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-lg mt-2">
        Price:{" "}
        {event.is_free ? (
          <span className="text-green-600">Free</span>
        ) : (
          `₹${event.ticket_price}`
        )}
      </p>
    </div>
  );
};

export default EventDetail;
