import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressTracker from './ProgressTracker';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await fetch(`http://localhost:9999/api/complaints/${id}`);
        const result = await res.json();

        if (!res.ok || !result.success) {
          throw new Error(result.message || 'Failed to fetch complaint');
        }

        setComplaint(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading complaint details...
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-red-500">{error || 'Complaint details not found.'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-600 underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProgressTracker status={complaint.status} />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-xl w-full p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Complaint Details</h2>
          <img
            className="w-full h-64 object-cover rounded-lg mb-4"
            alt="complaint-photo"
            src={complaint.imageUrl}
          />
          <p><strong>S.No:</strong> {complaint._id}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded w-full"
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default ComplaintDetails;
