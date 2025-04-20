import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ComplaintHistory = () => {
  const navigate = useNavigate();
  const [complaintsData, setComplaintsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  // Hardcoded userId for now

  // Fetch complaints from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/complaints`, // Adjust if needed
          { withCredentials: true }
        );
        setComplaintsData(response.data);
      } catch (err) {
        setError('Error fetching complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleViewDetails = (complaint) => {
    navigate(`/complaints/${complaint._id}`, { state: { complaint } });
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredComplaints = filter === 'all' 
    ? complaintsData 
    : complaintsData.filter(complaint => complaint.category === filter);

  const categoryOptions = ['all', ...new Set(complaintsData.map(c => c.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your complaints...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-red-600 text-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">Something went wrong</h3>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Complaint History</h1>
          <p className="text-gray-600">View and track all your submitted complaints</p>
        </div>
        
        {/* Filter Controls */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-sm">
          <div className="mb-4 sm:mb-0">
            <label className="text-sm font-medium text-gray-700 mr-2">Filter by category:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)} 
              className="mt-1 sm:mt-0 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {categoryOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Categories' : option}
                </option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => navigate('/complaints/add')}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Complaint
          </button>
        </div>
        
        {filteredComplaints.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={complaint.imageUrl}
                    alt={complaint.category}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Available';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status || 'Pending'}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      complaint.category === 'Electrical' ? 'bg-yellow-100 text-yellow-600' : 
                      complaint.category === 'Sanitation' ? 'bg-green-100 text-green-600' : 
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {complaint.category === 'Electrical' ? '⚡' : 
                       complaint.category === 'Sanitation' ? '🚿' : '💧'}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{complaint.category}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2" title={complaint.description}>
                    {complaint.description}
                  </p>
                  
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {new Date(complaint.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => handleViewDetails(complaint)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                    >
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No complaints found</h3>
            <p className="text-gray-600 mb-6">You haven't submitted any complaints yet or no results match your filter.</p>
            <button 
              onClick={() => navigate('/complaints/new')}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit a new complaint
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintHistory;