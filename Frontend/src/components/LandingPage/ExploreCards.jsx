import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../style/Home.css'
const Card = ({ image }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden min-w-[22.8%] h-80 mx-2 explore-cardsin">
    <img src={image} alt="Sample" className="w-full h-48 object-cover" />
  </div>
);

function ExploreCards() {
  const images = [
    
    'lion.jpeg',
    'lion.jpeg',
    'lion.jpeg',
    'lion.jpeg',
    'lion.jpeg',
    'lion.jpeg',
    'lion.jpeg',
    'lion.jpeg',
    
  ];

  const scrollRef = useRef(null);

  // Auto-scrolling logic with looping
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxScrollLeft = scrollRef.current.scrollWidth / 2;
        
        if (scrollRef.current.scrollLeft >= maxScrollLeft) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
        }

        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval); // Clean up interval
  }, []);

  // Scroll control functions with looping
  const scrollLeft = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft === 0) {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth / 2,
          behavior: 'instant'
        });
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
    <div className="p-8 bg-gray-100 flex flex-col items-center">
      {/* Cards Container */}
      <div
        ref={scrollRef}
        className="flex flex-nowrap overflow-hidden scroll-smooth w-full max-w-5xl"
      >
        {/* Duplicating cards for seamless loop */}
        {[...images, ...images].map((img, index) => (
          <Card key={index} image={img} />
        ))}
      </div>

      {/* Arrow Buttons */}
      <div className="flex mt-4 gap-4">
        <button
          onClick={scrollLeft}
          className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={scrollRight}
          className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default ExploreCards;
