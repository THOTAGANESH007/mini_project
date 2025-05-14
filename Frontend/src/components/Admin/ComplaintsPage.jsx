import React, { useState, useEffect } from "react";
import axios from "axios";

const categories = ["Electrical", "Drainage", "Water Service"];
const statuses = ["Pending", "Accepted", "Rejected", "Resolved"];

// Status color mapping
const statusColors = {
  Pending: "bg-yellow-500",
  Accepted: "bg-teal-500",
  Rejected: "bg-red-500",
  Resolved: "bg-green-500",
};

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/representatives/view/complaints`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setComplaints(res.data.data);
        } else {
          console.error("Failed to fetch complaints");
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const filteredComplaints = complaints.filter((comp) => {
    const matchCategory = filterCategory
      ? comp.category === filterCategory
      : true;
    const matchStatus = filterStatus ? comp.status === filterStatus : true;
    return matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filteredComplaints.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentComplaints = filteredComplaints.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <div className="bg-white py-6 px-4 shadow-sm">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Complaints Dashboard
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-gray-600 mb-2 text-sm font-medium">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  handleFilterChange();
                }}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-600 mb-2 text-sm font-medium">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  handleFilterChange();
                }}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-start-4">
              <label className="block text-gray-600 mb-2 text-sm font-medium">
                Cards per page
              </label>
              <select
                value={rowsPerPage}
                onChange={handleRowsChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            Showing{" "}
            <span className="font-medium text-gray-800">
              {Math.min(filteredComplaints.length, currentComplaints.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-800">
              {filteredComplaints.length}
            </span>{" "}
            complaints
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              «
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            <span className="px-4 py-2 text-gray-700">
              {currentPage} / {totalPages || 1}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ›
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              »
            </button>
          </div>
        </div>

        {/* Complaints Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <>
            {currentComplaints.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentComplaints.map((complaint) => (
                  <div
                    key={complaint._id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                  >
                    <div className="relative">
                      <img
                        src={complaint.imageUrl || "/api/placeholder/400/200"}
                        alt="Complaint"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/400/200";
                        }}
                      />
                      <div
                        className={`absolute top-3 right-3 ${
                          statusColors[complaint.status]
                        } text-white text-xs font-bold px-3 py-1 rounded-full`}
                      >
                        {complaint.status}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-3">
                        <div className="text-gray-500 text-sm mb-1">
                          Category
                        </div>
                        <div className="font-medium text-gray-800">
                          {complaint.category}
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-500 text-sm mb-1">
                          User ID
                        </div>
                        <div className="font-medium text-gray-800 truncate">
                          {complaint.userId}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-200">
                <div className="text-3xl text-gray-400 mb-2">
                  No complaints found
                </div>
                <p className="text-gray-500">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </>
        )}

        {/* Bottom pagination for mobile */}
        {currentComplaints.length > 0 && (
          <div className="mt-8 flex justify-center sm:hidden">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700">
                {currentPage} / {totalPages || 1}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintsPage;
