import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Card = ({ image, id, onClick }) => (
  <div
    onClick={() => onClick(id)}
    className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-[22.8%] h-96 mx-2 transition-transform duration-300 hover:-translate-y-6 cursor-pointer"
  >
    <img src={image} alt="Place" className="w-full h-full object-cover" />
  </div>
);

function ExploreCards() {
  const [places, setPlaces] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Fetch places from API on mount
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/admin/places`
        );
        setPlaces(res.data); // Make sure the backend returns an array
      } catch (err) {
        console.error("Failed to fetch places:", err);
      }
    };
    fetchPlaces();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxScrollLeft = scrollRef.current.scrollWidth / 2;

        if (scrollRef.current.scrollLeft >= maxScrollLeft) {
          scrollRef.current.scrollTo({ left: 0, behavior: "instant" });
        }

        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft === 0) {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth / 2,
          behavior: "instant",
        });
      }
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const maxScrollLeft = scrollRef.current.scrollWidth / 2;
      if (scrollRef.current.scrollLeft >= maxScrollLeft) {
        scrollRef.current.scrollTo({ left: 0, behavior: "instant" });
      }
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClick = (id) => {
    navigate(`/places/${id}`);
  };

  return (
    <div className="p-8 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-300 mb-6">Explore</h1>

      <div
        ref={scrollRef}
        className="flex overflow-hidden scroll-smooth w-full max-w-5xl whitespace-nowrap"
      >
        {[...places, ...places].map((place, index) => (
          <Card
            key={index}
            image={place.imageUrl}
            id={place._id}
            onClick={handleCardClick}
          />
        ))}
      </div>

      <div className="flex mt-6 gap-4">
        <button
          onClick={scrollLeft}
          className="p-3 cursor-pointer bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={scrollRight}
          className="p-3 cursor-pointer bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default ExploreCards;
