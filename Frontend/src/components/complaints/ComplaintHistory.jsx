import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ComplaintHistory = () => {
  const navigate = useNavigate();
  const [complaintsData, setComplaintsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = '661f9f72e13fdd57b7095a10'; // Hardcoded userId for now

  // Fetch complaints from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/complaints`, // Adjust if needed
          {
            params: { userId }, // Pass userId as query parameter
          }
        );
        setComplaintsData(response.data);
      } catch (err) {
        setError('Error fetching complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [userId]);

  const handleViewDetails = (complaint) => {
    navigate(`/complaints/${complaint._id}`, { state: { complaint } });
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {complaintsData.length > 0 ? (
        complaintsData.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
          >
            <img
              src={complaint.imageUrl}
              alt={complaint.category}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{complaint.category}</h3>
              <p>{complaint.description}</p>
              <p>{complaint.status}</p>
              <button
                onClick={() => handleViewDetails(complaint)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No complaints found.</div>
      )}
    </div>
  );
};

export default ComplaintHistory;
