import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ComplaintsCards = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Sample email and role – this would typically come from auth/session
  const email = "electricOfficer123@gmail.com";
  const role = "Electric Officer";

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/representatives/view/complaints",
          {
            params: { email, role },
            withCredentials: true, // if you are using cookies for authentication
          }
        );

        if (response.data.success) {
          setComplaints(response.data.data);
        } else {
          console.error("Failed to fetch complaints.");
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {complaints.map((complaint) => (
        <div
          key={complaint._id}
          onClick={() => navigate(`${complaint._id}`)}
          className="cursor-pointer bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
        >
          {complaint.imageUrl ? (
            <img
              src={complaint.imageUrl}
              alt="Complaint"
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div className="p-4">
            <p className="font-semibold text-gray-800 mb-1">
              Phone: {complaint.phone}
            </p>
            <p className="text-gray-700 mb-1">
              Status:{" "}
              <span className="font-medium text-indigo-600">
                {complaint.status}
              </span>
            </p>
            <p className="text-sm text-gray-600 truncate">
              {complaint.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintsCards;
