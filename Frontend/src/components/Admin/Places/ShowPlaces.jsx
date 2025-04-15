import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowPlaces = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  // Simulated fetch — replace with your actual API call
  
  useEffect(() => {
   
    fetchPlaces();
  }, []);
  const fetchPlaces = async () => {
    try {
      const res = await axios.get("http://localhost:9999/admin/places");
      setPlaces(res.data);
    } catch (err) {
      console.error("Failed to fetch places", err);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit place with ID:", id);
    // Navigate to edit page or open modal
    navigate(`/admin/place/edit/${id}`);
  };

  const handleRemove = async(id) => {
    
    // Call API to delete, then update state
    try {
      const res=await axios.delete(`http://localhost:9999/admin/places/${id}`);
      setPlaces((prev) => prev.filter((place) => place._id !== id));
    } catch (err) {
      console.error("Failed to delete place", err);
      alert("Error deleting the place.");
    }
   
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Places
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {places.map((place) => (
          <div
            key={place._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden transition hover:shadow-lg"
          >
            <img
              src={place.image_url}
              alt={place.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {place.name}
              </h2>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(place._id)}
                  className="bg-blue-500 hover:bg-yellow-500 text-white px-4 py-1 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(place._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPlaces;
