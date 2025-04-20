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

const PlaceFilter = ({setplaces}) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = async(category) => {
    setSelected(category);
    if (category === "All") {
      const res = await axios.get("http://localhost:9999/admin/places");
      console.log(res.data.data);
      setplaces(res.data.data);
      
    }
    const res=await axios.get(`http://localhost:9999/admin/places/category/${category}`);
    console.log(res.data.data);
    setplaces(res.data.data);
    
  };

  return (
    <div className=" bg-gray-100 mx-auto py-5 px-2">
     

      <div className="flex flex-wrap gap-4 items-start">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className="px-6 py-2 bg-gray-300  rounded-xl shadow-md hover:bg-blue-400 transition-all duration-200"
          >
            {cat}
          </button>
        ))}

        {/* Dropdown (opens on hover) */}
        <div className="relative group">
          <button className="px-6 py-2 bg-gray-600 text-white rounded-xl shadow-md hover:bg-gray-700 transition-all duration-200">
            More
          </button>
          <div className="absolute hidden group-hover:block mt-2 w-40 bg-white rounded-md shadow-lg z-10">
            {moreCategories.map((item) => (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* {selected && (
        <div className="mt-6 text-left text-lg text-green-700 font-medium">
          You selected: {selected}
        </div>
      )} */}
    </div>
  );
};

export default PlaceFilter;
