import React from "react";

const DisplayRepresentatives = ({
  name,
  email,
  phoneNumber,
  designation,
  photo,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full text-center transform transition-all hover:scale-105 hover:shadow-xl flex flex-col items-center">
      <img
        src={photo || "https://via.placeholder.com/96?text=Photo"}
        alt={name}
        className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      <p className="text-blue-600 font-medium">{designation}</p>
      <div className="mt-3 text-left w-full">
        <p className="text-gray-600 text-sm break-all">
          <strong>Email:</strong> {email}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Phone:</strong> {phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default DisplayRepresentatives;
