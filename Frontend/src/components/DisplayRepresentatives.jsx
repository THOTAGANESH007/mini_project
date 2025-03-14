import React from 'react';

const DisplayRepresentatives = ({ name, email, phoneNumber, designation, photo }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center transform transition-all hover:scale-105 hover:shadow-xl">
      <img 
        src={photo} 
        alt={name} 
        className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 object-cover"
      />
      <h2 className="text-xl font-semibold text-gray-800 mt-4">{name}</h2>
      <p className="text-blue-600 font-medium">{designation}</p>
      <p className="text-gray-600 text-sm mt-2"><strong>Email:</strong> {email}</p>
      <p className="text-gray-600 text-sm"><strong>Phone:</strong> {phoneNumber}</p>
    </div>
  );
};

export default DisplayRepresentatives;
