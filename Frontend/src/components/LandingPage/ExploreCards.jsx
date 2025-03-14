import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Card = ({ image }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-[22.8%] h-80 mx-2 transition-transform duration-300 hover:-translate-y-6">
    <img src={image} alt="Sample" className="w-full h-full object-cover cursor-pointer" />
  </div>
);

function ExploreCards() {
  const images = ['lion.jpeg', 'lion.jpeg', 'lion.jpeg', 'lion.jpeg', 'lion.jpeg', 'lion.jpeg', 'lion.jpeg', 'lion.jpeg'];

  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxScrollLeft = scrollRef.current.scrollWidth / 2;

        if (scrollRef.current.scrollLeft >= maxScrollLeft) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
        }

        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft === 0) {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth / 2, behavior: 'instant' });
      }
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const maxScrollLeft = scrollRef.current.scrollWidth / 2;
      if (scrollRef.current.scrollLeft >= maxScrollLeft) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
      }
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-8 bg-gray-900 text-white flex flex-col items-center">
      {/* Explore Section Title */}
      <h1 className="text-4xl font-bold text-gray-300 mb-6">Explore</h1>

      {/* Cards Container */}
      <div ref={scrollRef} className="flex overflow-hidden scroll-smooth w-full max-w-5xl whitespace-nowrap">
        {[...images, ...images].map((img, index) => (
          <Card key={index} image={img} />
        ))}
      </div>

      {/* Arrow Buttons */}
      <div className="flex mt-6 gap-4">
        <button onClick={scrollLeft} className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
          <ChevronLeft />
        </button>
        <button onClick={scrollRight} className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default ExploreCards;
