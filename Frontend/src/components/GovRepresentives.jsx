import React, { useEffect, useState } from "react";
import DisplayRepresentatives from "./DisplayRepresentatives";
import axios from "axios";

const GovRepresentives = () => {
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
  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 ">
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
  );
};

export default GovRepresentives;
