import React, { useEffect, useState } from "react";
import axios from "axios";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:9999/api/appointments/byUser", {
          withCredentials: true,
        });
        console.log("all appointment by user",res.data.data)
        setAppointments(res.data.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        setError("Unable to load appointments. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter appointments based on tab and search query
  const filteredAppointments = appointments.filter((appt) => {
    // Filter by status
    if (activeTab === "pending" && appt.appointmentStatus !== "Pending") return false;
    if (activeTab === "accepted" && appt.appointmentStatus !== "Accepted") return false;
  
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        appt.department.toLowerCase().includes(query) ||
        appt.description.toLowerCase().includes(query)
      );
    }
  
    return true;
  });
  
  
  // Sort appointments by date
  filteredAppointments.sort((a, b) => {
    const dateA = new Date(a.appointmentDate);
    const dateB = new Date(b.appointmentDate);
    return activeTab === 'pending' ? dateA - dateB : dateB - dateA;
  });

  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const formatTimeFromNow = (dateString) => {
    const now = new Date();
    const then = new Date(dateString);
    const diffMs = Math.abs(then - now);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return then > now 
        ? `In ${diffDays} day${diffDays !== 1 ? 's' : ''}`
        : `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return then > now
        ? `In ${diffHours} hour${diffHours !== 1 ? 's' : ''}`
        : `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return then > now
        ? `In ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`
        : `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    }
  };

  const getStatusColor = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    if (date < now) {
      return "text-gray-600";  // Completed
    }
    
    const diffMs = date - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 24) {
      return "text-red-600";   // Upcoming - today/tomorrow
    } else if (diffHours < 72) {
      return "text-orange-500"; // Upcoming - within 3 days
    } else {
      return "text-green-600";  // Upcoming - later
    }
  };

  const getDepartmentIcon = (department) => {
    // Return appropriate icon based on department
    switch(department.toLowerCase()) {
      case "dental":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        );
      case "cardiology":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        );
      case "pediatric":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        );
    }
  };

  const handleAppointmentClick = (appt) => {
    setSelectedAppointment(appt);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading your appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 max-w-lg">
          <h3 className="text-red-700 font-medium text-lg mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">My Appointments</h2>
          <p className="text-gray-600 mt-2">View and manage your scheduled appointments</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by department or description..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                  activeTab === 'pending'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                pending
              </button>
              <button
                onClick={() => setActiveTab('accepted')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                  activeTab === 'accepted'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Accepted
              </button>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-medium text-gray-700">
              {activeTab === "upcoming" ? "Upcoming Appointments" : "Completed Appointments"}
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {filteredAppointments.length}
              </span>
            </h3>
          </div>

          {filteredAppointments.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredAppointments.map((appt) => (
                <div 
                  key={appt._id}
                  className="p-4 md:p-5 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => handleAppointmentClick(appt)}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 rounded-full p-2 ${getStatusColor(appt.appointmentDate).replace('text-', 'bg-').replace('-600', '-100').replace('-500', '-100')}`}>
                      {getDepartmentIcon(appt.department)}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">{appt.department}</h4>
                        <span className={`text-sm font-medium ${getStatusColor(appt.appointmentDate)}`}>
                          {formatTimeFromNow(appt.appointmentDate)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">{appt.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {formatDateDisplay(appt.appointmentDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 px-4 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                {searchQuery ? "No appointments match your search" : `No ${activeTab} appointments found.`}
              </p>
            </div>
          )}
        </div>

        {/* Appointment Details Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg px-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">Appointment Details</h3>
                  <button onClick={closeModal} className="text-white hover:text-gray-200">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-full ${getStatusColor(selectedAppointment.appointmentDate).replace('text-', 'bg-').replace('-600', '-100').replace('-500', '-100')}`}>
                    {getDepartmentIcon(selectedAppointment.department)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-xl text-gray-900">{selectedAppointment.department}</h4>
                    <span className={`text-sm font-medium ${getStatusColor(selectedAppointment.appointmentDate)}`}>
                      {formatTimeFromNow(selectedAppointment.appointmentDate)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Description</h5>
                    <p className="mt-1 text-gray-800">{selectedAppointment.description}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Date & Time</h5>
                    <p className="mt-1 text-gray-800">{formatDateDisplay(selectedAppointment.appointmentDate)}</p>
                  </div>
                  
                  {selectedAppointment.location && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-500">Location</h5>
                      <p className="mt-1 text-gray-800">{selectedAppointment.location}</p>
                    </div>
                  )}
                  
                  {selectedAppointment.doctor && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-500">Doctor</h5>
                      <p className="mt-1 text-gray-800">{selectedAppointment.doctor}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex gap-3">
                  {new Date(selectedAppointment.appointmentDate) > new Date() && (
                    <button className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 py-2 px-4 rounded-lg font-medium transition">
                      Cancel Appointment
                    </button>
                  )}
                  <button 
                    onClick={closeModal}
                    className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-lg font-medium transition"
                  >
                    {new Date(selectedAppointment.appointmentDate) > new Date() ? 'Close' : 'OK'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;