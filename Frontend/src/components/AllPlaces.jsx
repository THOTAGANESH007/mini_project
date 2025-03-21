import React, { useState } from "react";
import places from "../utils/places";
import PlaceDetail from "./PlaceDetail";

const AllPlaces = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="flex flex-col items-center bg-gray-100 py-10 mt-[95px] mb-[10px]">
      {selectedPlace ? (
        <PlaceDetail place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {places.map((place, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
              <img src={place.photo} alt={place.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{place.name}</h3>
                <button
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => setSelectedPlace(place)}
                >
                  Read More...
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPlaces;
