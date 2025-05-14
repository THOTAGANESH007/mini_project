import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExploreCardItem = ({ image, id, onClick }) => (
  <div
    onClick={() => onClick(id)}
    className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-[80%] sm:w-[45%] md:w-[30%] lg:w-[22.8%] h-80 sm:h-96 mx-2 transition-transform duration-300 hover:-translate-y-2 sm:hover:-translate-y-4 cursor-pointer"
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

    // REMOVE THE window.innerWidth >= 768 CONDITION
    if (places.length > 0) {
      intervalId = setInterval(autoScroll, 25);
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
      className="py-8 px-4 sm:px-8 text-white flex flex-col items-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-300 mb-6 text-center">
        Explore Attractions
      </h1>

      {places.length === 0 && (
        <p className="text-gray-400">Loading attractions...</p>
      )}

      {displayPlaces.length > 0 && (
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl no-scrollbar pb-4"
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
            className="p-3 cursor-pointer bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
            aria-label="Scroll Left"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scrollControl(300)}
            className="p-3 cursor-pointer bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
            aria-label="Scroll Right"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default ExploreCards;
