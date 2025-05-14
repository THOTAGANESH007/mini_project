import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExploreCardItem = ({ image, id, onClick }) => (
  <div
    onClick={() => onClick(id)}
    className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-[80%] sm:w-[60%] md:w-[45%] lg:w-[30%] xl:w-[22.8%] h-72 sm:h-80 md:h-96 mx-2 transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
  >
    <img
      src={image || "https://via.placeholder.com/400x300?text=Place+Image"}
      alt="Place"
      className="w-full h-full object-cover"
    />
  </div>
);

function ExploreCards() {
  const [places, setPlaces] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/places`
        );
        setPlaces(res.data.slice(0, 8));
      } catch (err) {
        console.error("Failed to fetch places:", err);
      }
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    let intervalId;
    const scroller = scrollRef.current;

    const autoScroll = () => {
      if (scroller && places.length > 0 && !isHovering) {
        const scrollAmount = 1;
        const singleSetWidth = scroller.scrollWidth / 2;

        if (scroller.scrollLeft >= singleSetWidth) {
          scroller.scrollLeft -= singleSetWidth;
        }
        scroller.scrollLeft += scrollAmount;
      }
    };

    if (places.length > 0) {
      intervalId = setInterval(autoScroll, 30); // Adjusted speed (lower is faster)
    }

    return () => clearInterval(intervalId);
  }, [places, isHovering]);

  const scrollControl = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleCardClick = (id) => {
    navigate(`/places/${id}`);
  };

  const displayPlaces = places.length > 0 ? [...places, ...places] : [];

  return (
    <div
      className="py-8 px-2 sm:px-4 text-white flex flex-col items-center" // Reduced horizontal padding for mobile
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Heading is in Explore.jsx */}

      {places.length === 0 && (
        <p className="text-gray-400 my-10">Loading attractions...</p>
      )}

      {displayPlaces.length > 0 && (
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth w-full max-w-full no-scrollbar pb-4" // Allow full width and rely on card sizing
        >
          {displayPlaces.map((place, index) => (
            <ExploreCardItem
              key={`${place._id}-${index}`}
              image={place.imageUrl}
              id={place._id}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}

      {places.length > 0 && (
        <div className="flex mt-6 gap-4">
          <button
            onClick={() => scrollControl(-300)}
            className="p-2 sm:p-3 cursor-pointer bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollControl(300)}
            className="p-2 sm:p-3 cursor-pointer bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
            aria-label="Scroll Right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ExploreCards;
