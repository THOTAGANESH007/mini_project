import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayRepresentatives from "../DisplayRepresentatives";
import axios from "axios";

const RepresentativesPreview = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/representative/view`,
          {
            withCredentials: true,
          }
        );
       
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch members:", err);
      }
    };

    fetchMembers();
  }, []);

  const previewData = data.slice(0, 3);

  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto rounded-lg shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
          Meet Our Government Representatives
        </h1>

        {previewData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 p-4">
            {previewData.map((person, index) => (
              <DisplayRepresentatives
                key={index}
                name={person.name}
                email={person.email}
                phoneNumber={person.phoneNumber}
                designation={person.designation}
                photo={person.photoUrl}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-8">
            Loading representatives...
          </p>
        )}
      </div>

      {data.length > 0 && ( // Only show button if there's data
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/officials")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            View All Officials
          </button>
        </div>
      )}
    </div>
  );
};

export default RepresentativesPreview;
