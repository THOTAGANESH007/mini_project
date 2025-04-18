import React, { useEffect, useState } from "react";
import places from "../utils/places";
import PlaceDetail from "./PlaceDetail";
import PlaceFilter from "./PlaceFilter";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllPlaces = () => {
   const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
   
    fetchPlaces();
  }, []);
  const fetchPlaces = async () => {
    try {
      const res = await axios.get("http://localhost:9999/admin/places");
      console.log(res)
      setPlaces(res.data);
    } catch (err) {
      console.error("Failed to fetch places", err);
    }
  };

  return (
    <>
    <PlaceFilter/>
    <div className="flex flex-col items-center bg-gray-100 py-10 mb-[10px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {places.map((place) => (
          <div key={place._id} className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{place.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {place.description.length > 60
                ? `${place.description.substring(0, 60)}...`
                : place.description}
            </p>
            <button
              className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 text-left"
              onClick={() => navigate(`/places/${place._id}`)}
            >
              ...Read More
            </button>
          </div>
        </div>
        
          
        ))}
      </div>
    </div>
    </>
  );
};

export default AllPlaces;
