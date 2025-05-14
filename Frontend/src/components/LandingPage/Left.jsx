import React, { useEffect, useState } from "react";
import Card from "./Card";
import "../../style/Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Left() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/events`
        );
        // Take first few for preview, e.g., 6, for the duplicated scroll effect
        setEvents(res.data.slice(0, 6));
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/event/${id}`);
  };

  // Duplicate events for seamless scroll effect
  const displayEvents = events.length > 0 ? [...events, ...events] : [];

  return (
    <div className="scroll-container-left no-scrollbar">
      {" "}
      {/* Added no-scrollbar */}
      <div className="scroll-content-left">
        {displayEvents.map((event, index) => (
          <Card
            key={`${event._id}-${index}`} // Unique key for duplicated items
            image={
              event.img || "https://via.placeholder.com/300x300?text=Event"
            }
            title={event.title}
            description={event.description}
            onClick={() => handleCardClick(event._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Left;
