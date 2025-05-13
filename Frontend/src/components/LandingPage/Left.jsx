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
          `${process.env.REACT_APP_API_BASE_URL}/admin/events`
        );
        setEvents(res.data); // assumes response is an array of events
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/event/${id}`);
  };

  return (
    <div className="scroll-container-left">
      <div className="scroll-content-left">
        {[...events, ...events].map((event, index) => (
          <Card
            key={index}
            image={event.img}
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
