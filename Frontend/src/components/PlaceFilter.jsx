import axios from "axios";
import React, { useState } from "react";

const categories = [
  "All",
  "Temples",
  "Theatres",
  "Parks",
  "Hotels",
  "Lodges",
  "Restaurants",
  "Gyms",
  "Aquariums",
  "Art Galleries",
];
const moreCategories = ["Museums", "Cafes", "Malls", "Beaches", "Zoos"];

const PlaceFilter = ({ setplaces, resetPlaces, allPlaces }) => {
  // Added resetPlaces and allPlaces
  const [selected, setSelected] = useState("All"); // Default to "All"
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handleSelect = async (category) => {
    setSelected(category);
    setIsMoreOpen(false);

    try {
      if (category === "All") {
        // If using a prop to reset to all places:
        if (resetPlaces) resetPlaces();
        // Or fetch all again (less efficient if allPlaces prop is available)
        // const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/places`);
        // setplaces(res.data);
      } else {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/admin/places/category/${category}`
        );
        setplaces(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching category:", err);
      // Optionally set places to an empty array or show error
      setplaces([]);
    }
  };

  return (
    <div className="bg-gray-100 mx-auto py-5 px-2">
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className={`px-3 py-2 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl shadow-md hover:bg-blue-400 transition-all duration-200 text-xs sm:text-sm
                        ${
                          selected === cat
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-800"
                        }`}
          >
            {cat}
          </button>
        ))}

        <div className="relative">
          <button
            onClick={() => setIsMoreOpen((prev) => !prev)}
            className={`px-3 py-2 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl shadow-md hover:bg-gray-700 transition-all duration-200 text-xs sm:text-sm
                        ${
                          moreCategories.includes(selected)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-600 text-white"
                        }`}
          >
            More
          </button>

          {isMoreOpen && (
            <div className="absolute mt-2 w-32 sm:w-40 bg-white rounded-md shadow-lg z-10 right-0 sm:right-auto sm:left-0">
              {moreCategories.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={`block w-full text-left px-3 py-2 sm:px-4 sm:py-2 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm
                              ${
                                selected === item
                                  ? "bg-blue-100 font-semibold"
                                  : ""
                              }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceFilter;
