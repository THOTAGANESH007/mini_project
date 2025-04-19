import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin, User, Clock, Tag, ExternalLink } from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:9999/admin/events/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-lg text-gray-600">Loading event details...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <p className="text-center text-red-600 font-medium">
            Error: {error || "Event not found."}
          </p>
        </div>
      </div>
    );
  }

  // Format date if it exists
  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Hero section with image overlay */}
        <div className="relative h-80">
          <img
            src={event.img || "/api/placeholder/800/400"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 text-white">
              {event.is_free ? (
                <span className="bg-green-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                  Free Event
                </span>
              ) : (
                <span className="bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                  ₹{event.ticket_price}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mt-2">{event.title}</h1>
            </div>
          </div>
        </div>

        {/* Event details */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">About This Event</h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center mb-3">
                <Calendar className="text-blue-500 mr-2" size={20} />
                <h3 className="font-medium text-gray-800">Date & Time</h3>
              </div>
              <p className="text-gray-600">
                {formatDate(event.event_date)}
                {event.event_time && `, ${event.event_time}`}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center mb-3">
                <MapPin className="text-blue-500 mr-2" size={20} />
                <h3 className="font-medium text-gray-800">Location</h3>
              </div>
              <p className="text-gray-600">{event.location || "Location TBA"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center mb-3">
                <User className="text-blue-500 mr-2" size={20} />
                <h3 className="font-medium text-gray-800">Organizer</h3>
              </div>
              <p className="text-gray-600">{event.organizer_name}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center mb-3">
                <Tag className="text-blue-500 mr-2" size={20} />
                <h3 className="font-medium text-gray-800">Price</h3>
              </div>
              <p className="text-gray-600">
                {event.is_free ? "Free Entry" : `₹${event.ticket_price}`}
              </p>
            </div>
          </div>

          {/* Registration button */}
          {event.registration_link && (
            <div className="flex justify-center mt-6">
              <a
                href={event.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition duration-200"
              >
                Register Now
                <ExternalLink size={18} className="ml-2" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;