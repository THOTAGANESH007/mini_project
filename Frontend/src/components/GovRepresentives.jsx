import React, { useEffect, useState } from "react";
import DisplayRepresentatives from "./DisplayRepresentatives";
import axios from "axios";

const GovRepresentives = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading representatives...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">
          Our Government Representatives
        </h1>
        {data.length === 0 && !loading && (
          <p className="text-center text-gray-600">No representatives found.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.map((person, index) => (
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
      </div>
    </div>
  );
};

export default GovRepresentives;
