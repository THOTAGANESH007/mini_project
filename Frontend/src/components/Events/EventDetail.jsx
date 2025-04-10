import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import allEvents from "./events";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = allEvents[id];

  if (!event) {
    return <p className="text-center mt-10 text-red-600">Event not found.</p>;
  }

  return (
    <div style={{minHeight:"100vh"}} className="max-w-4xl mx-auto p-6 mt-5 bg-white shadow-lg rounded-2xl mt-10">
    <img src={event.img} alt={event.title} className="w-full h-64 object-cover rounded-xl mb-6" />

    <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h1>
    <p className="text-gray-600 text-lg mb-4">{event.description}</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-4">
      <div>
        <span className="font-semibold">Organizer:</span> {event.organizer_name}
      </div>
      <div>
        <span className="font-semibold">Location:</span> {event.location}
      </div>
      <div>
        <span className="font-semibold">Price:</span>{" "}
        {event.isfree ? "Free" : `$${event.price}`}
      </div>
      <div>
        <span className="font-semibold">Registration:</span>{" "}
        <a
          href={event.registration_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Click here to register
        </a>
      </div>
    </div>
  </div>
  );
};

export default EventDetail;
