import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComplaintCards = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (name) => {
    if (name === "addComplaints") {
      navigate("/complaints/add");
    }
    if (name === "history") {
      navigate("/complaints/history");
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Complaint Management</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Report issues or check the status of your existing complaints
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Add New Complaints Card */}
          <div 
            onClick={() => handleCardClick("addComplaints")}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
          >
            <div className="bg-blue-500 h-2 w-full group-hover:bg-blue-600 transition-colors"></div>
            <div className="p-8">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Add New Complaint</h2>
              <p className="text-gray-600 text-center">Report an issue or submit a new complaint</p>
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium group-hover:bg-blue-100 transition-colors">
                  File Complaint
                </span>
              </div>
            </div>
          </div>

          {/* History Card */}
          <div 
            onClick={() => handleCardClick("history")}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
          >
            <div className="bg-purple-500 h-2 w-full group-hover:bg-purple-600 transition-colors"></div>
            <div className="p-8">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Complaint History</h2>
              <p className="text-gray-600 text-center">View status and track your previous complaints</p>
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-sm font-medium group-hover:bg-purple-100 transition-colors">
                  View History
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gray-50 rounded-xl p-6 shadow-md max-w-2xl mx-auto">
          <h3 className="font-medium text-gray-800 mb-2">Need assistance?</h3>
          <p className="text-gray-600 text-sm">
            Our support team is available Monday to Friday, 9am to 5pm.
            Contact us at support@example.com or call (123) 456-7890.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCards;