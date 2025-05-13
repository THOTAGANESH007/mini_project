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
          `${process.env.REACT_APP_API_BASE_URL}/admin/representative/view`,
          {
            withCredentials: true,
          }
        );
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch members:", err);
      } finally {
      }
    };

    fetchMembers();
  }, []);
  const previewData = data.slice(0, 3); // Show first 5 only

  return (
    <>
      <div className="max-w-7xl mx-auto bg-gray-100 p-6 rounded shadow-xl mt-4 mb-2">
        <h1 className="text-3xl font-bold text-center mb-8">
          Government Representatives
        </h1>

        <div className="flex gap-6 px-4 overflow-x-auto scroll-smooth no-scrollbar">
          {previewData.map((person, index) => (
            <div key={index} className="min-w-[420px]">
              <DisplayRepresentatives
                name={person.name}
                email={person.email}
                phoneNumber={person.phoneNumber}
                designation={person.designation}
                photo={person.photoUrl}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/officials")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
        >
          View All Officials
        </button>
      </div>
    </>
  );
};

export default RepresentativesPreview;
