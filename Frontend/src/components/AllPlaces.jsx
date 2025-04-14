import React, { useState } from "react";
import places from "../utils/places";
import PlaceDetail from "./PlaceDetail";
import PlaceFilter from "./PlaceFilter";

const AllPlaces = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <>
    <PlaceFilter/>
    <div className="flex flex-col items-center bg-gray-100 py-10  mb-[10px]">
      {selectedPlace ? (
        <PlaceDetail place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {places.map((place, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
              <img src={place.photo} alt={place.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{place.name}</h3>
                <div className="rating w-full">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" aria-label="1 star" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" defaultChecked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
</div>
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
    </>
  );
};

export default AllPlaces;
