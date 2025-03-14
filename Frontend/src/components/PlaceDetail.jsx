import React from "react";

const PlaceDetail = ({ place, onClose }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg w-3/5 p-6 text-center">
      <img src={place.photo} alt={place.name} className="w-full h-60 object-fit rounded-lg" />
      <h2 className="text-2xl font-bold mt-4">{place.name}</h2>
      <p className="text-gray-600 mt-2">{place.description}</p>
      <button
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        onClick={onClose}
      >
        Close
      </button> 
    </div>
  );
};

export default PlaceDetail;
