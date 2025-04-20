import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ComplaintsCards = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Sample email and role – this would typically come from auth/session
 
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/representatives/view/complaints",
          {
          
            withCredentials: true, // if you are using cookies for authentication
          }
        );

        if (response.data.success) {
          console.log("complaints",response.data)
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

  const filteredComplaints = filter === "all" 
    ? complaints 
    : complaints.filter(complaint => complaint.status.toLowerCase() === filter);

  const getStatusColor = (status) => {
    const statusMap = {
      pending: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800",
    };
    return statusMap[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Complaints Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and respond to filed complaints</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 text-sm font-medium ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border-t border-b border-r border-gray-300`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("processing")}
              className={`px-4 py-2 text-sm font-medium ${filter === 'processing' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border-t border-b border-r border-gray-300`}
            >
              Processing
            </button>
            <button
              onClick={() => setFilter("resolved")}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${filter === 'resolved' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border-t border-b border-r border-gray-300`}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>
      
      {filteredComplaints.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No complaints found</h3>
          <p className="mt-1 text-sm text-gray-500">No complaints match your current filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint._id}
              onClick={() => navigate(`${complaint._id}`)}
              className="group bg-white overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col"
            >
              <div className="relative">
                {complaint.imageUrl ? (
                  <img
                    src={complaint.imageUrl}
                    alt="Complaint"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>
              
              <div className="p-5 flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="font-medium text-gray-900">{complaint.phone}</p>
                </div>
                
                <p className="text-gray-600 line-clamp-2 mb-4">{complaint.description}</p>
                
                <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    ID: {complaint._id.substring(0, 8)}...
                  </div>
                  <div className="text-blue-600 text-sm font-medium group-hover:underline">
                    View Details →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintsCards;