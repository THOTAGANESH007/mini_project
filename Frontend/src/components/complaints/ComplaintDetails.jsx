import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressTracker from './ProgressTracker';

const ComplaintDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const complaint = location.state?.complaint;

  if (!complaint) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-red-500">Complaint details not found.</p>
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
    <ProgressTracker/>
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Complaint Details</h2>
        <img className='w-200 h-50 rounded-lg mb-2 ' alt='complaint-photo'  src={`https://smartwatermagazine.com/sites/default/files/styles/thumbnail-1180x647/public/water-pipe-2.jpg?itok=cy3hSz5q`}
            />
        <p><strong>S.No:</strong> {complaint.sno}</p>
        <p><strong>Category:</strong> {complaint.category}</p>
        <p><strong>Description:</strong> {complaint.description}</p>
        {/* <p>
          <strong>Status:</strong>{' '}
          <span
            className={
              complaint.status === 'Pending'
                ? 'text-yellow-600'
                : complaint.status === 'Completed'
                ? 'text-green-600'
                : 'text-red-600'
            }
          >
            {complaint.status}
          </span>
        </p> */}
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
