import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowPlaces = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  // Simulated fetch — replace with your actual API call
  useEffect(() => {
    const mockData = [
      {
        _id: "1",
        name: "Sunset Beach",
        image_url: "https://source.unsplash.com/featured/?beach",
      },
      {
        _id: "2",
        name: "Green Park",
        image_url: "https://source.unsplash.com/featured/?park",
      },
      {
        _id: "3",
        name: "Historic Museum",
        image_url: "https://source.unsplash.com/featured/?museum",
      },
    ];
    setPlaces(mockData);
  }, []);

  const handleEdit = (id) => {
    console.log("Edit place with ID:", id);
    // Navigate to edit page or open modal
    navigate(`/admin/edit/${id}`);
  };

  const handleRemove = (id) => {
    console.log("Remove place with ID:", id);
    // Call API to delete, then update state
    setPlaces((prev) => prev.filter((place) => place._id !== id));
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
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-lg"
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
