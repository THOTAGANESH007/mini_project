import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressTracker from './ProgressTracker';

const ComplaintHistory = () => {
  const navigate = useNavigate();

  const complaintsData = [
    {
      sno: 1,
      category: 'Electricity',
      description: 'Frequent power cuts during evening hours.',
      status: 'Pending',
    },
    {
      sno: 2,
      category: 'Water Service',
      description: 'No water supply in the morning for 3 days.',
      status: 'Completed',
    },
    {
      sno: 3,
      category: 'Drainage',
      description: 'Blocked drainage causing foul smell and overflow.',
      status: 'Pending',
    },
    {
      sno: 4,
      category: 'Others',
      description: 'Street light not working in lane 4.',
      status: 'Completed',
    },
    {
      sno: 5,
      category: 'Water Service',
      description: 'Rusty water from taps in the building.',
      status: 'Rejected',
    },
    {
      sno: 6,
      category: 'Electricity',
      description: 'Sparks observed in the main switch box.',
      status: 'Pending',
    },
    {
      sno: 7,
      category: 'Drainage',
      description: 'Drain near block B is overflowing every night.',
      status: 'Completed',
    },
    {
      sno: 8,
      category: 'Others',
      description: 'Unauthorized vehicle parking near the entrance.',
      status: 'Pending',
    },
    {
      sno: 9,
      category: 'Water Service',
      description: 'Very low water pressure since last week.',
      status: 'Completed',
    },
    {
      sno: 10,
      category: 'Electricity',
      description: 'Flickering lights in the common area.',
      status: 'Rejected',
    },
  ];

  const handleViewDetails = (complaint) => {
    navigate(`/complaint/${complaint.sno}`, { state: { complaint } });
  };

  return (
    <>
     
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     
      {complaintsData.map((complaint) => (
        <div
          key={complaint.sno}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
        >
          <img
            src={`https://smartwatermagazine.com/sites/default/files/styles/thumbnail-1180x647/public/water-pipe-2.jpg?itok=cy3hSz5q`}
            alt={complaint.category}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold">{complaint.category}</h3>
            <button
              onClick={() => handleViewDetails(complaint)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ComplaintHistory;
