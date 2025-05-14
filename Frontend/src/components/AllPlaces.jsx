import React, { useEffect, useState } from "react";
// import places from "../utils/places"; // This was likely placeholder data
// import PlaceDetail from "./PlaceDetail"; // Not used directly here
import PlaceFilter from "./PlaceFilter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [allFetchedPlaces, setAllFetchedPlaces] = useState([]); // To store all places for filtering
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/places`
      );
      setAllFetchedPlaces(res.data); // Store all for filtering
      setPlaces(res.data); // Initially display all
    } catch (err) {
      console.error("Failed to fetch places", err);
    }
  };

  // If using PlaceFilter to set places, this ensures the original full list is available
  const handleFilterChange = (filteredData) => {
    setPlaces(filteredData);
  };

  const resetPlaces = () => {
    setPlaces(allFetchedPlaces);
  };

  if (!places)
    return <div className="text-center py-10">Loading places...</div>;

  return (
    <>
      <PlaceFilter
        setplaces={handleFilterChange}
        resetPlaces={resetPlaces}
        allPlaces={allFetchedPlaces}
      />
      {places.length === 0 ? (
        <div className="flex flex-col items-center bg-gray-100 py-10 mb-[10px] min-h-[calc(100vh-200px)] justify-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-center mx-auto text-gray-700">
            No Places Found
          </h1>
          <p className="text-gray-600 mt-2 text-center mx-auto">
            Try adjusting your filters or check back later.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center bg-gray-100 py-10 mb-[10px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6">
            {places.map((place) => (
              <div
                key={place._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden w-full transform transition-all hover:scale-105"
              >
                <img
                  src={
                    place.imageUrl ||
                    "https://via.placeholder.com/320x192?text=Image"
                  }
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {place.name}
                  </h3>
                  <div className="flex my-1">
                    {[...Array(5)].map((_, i) => {
                      const rating = place.avgRating || 0;
                      return (
                        <span key={i} className="text-yellow-500">
                          {i < Math.floor(rating) ? (
                            <StarIcon fontSize="small" />
                          ) : (
                            <StarBorderIcon fontSize="small" />
                          )}
                        </span>
                      );
                    })}
                    <span className="ml-2 text-sm text-gray-500">
                      ({(place.avgRating || 0).toFixed(1)})
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1 h-16 overflow-hidden line-clamp-3">
                    {place.description}
                  </p>
                  <button
                    className="mt-3 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
                    onClick={() => navigate(`/places/${place._id}`)}
                  >
                    Read More & Reviews
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllPlaces;
