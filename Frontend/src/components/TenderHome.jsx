import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  FileText,
  User,
  Clock,
  Filter,
  Loader,
  Download,
  Tag,
  X,
  ExternalLink,
} from "lucide-react";

const TenderHome = () => {
  // State management
  const [user, setUser] = useState(null);
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Modal states
  const [selectedTender, setSelectedTender] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch (e) {
      console.error("Failed to parse user:", e);
      setUser(null);
    }
  }, []);

  // Fetch tenders when user is available
  useEffect(() => {
    const fetchTenders = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:9999/api/tenders", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch tenders: ${response.statusText}`);
        }

        const data = await response.json();
        setTenders(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching tenders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTenders();
    }
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOpenTender = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate > today;
  };

  const filteredTenders = tenders.filter((tender) => {
    // Search filter
    const matchesSearch =
      tender.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory =
      filterCategory === "all" || tender.category === filterCategory;

    // Status filter
    let matchesStatus = true;
    if (filterStatus === "open") {
      matchesStatus = isOpenTender(tender.deadline);
    } else if (filterStatus === "closed") {
      matchesStatus = !isOpenTender(tender.deadline);
    }

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewDetails = async (tenderId) => {
    try {
      setLoadingDetails(true);
      setDetailsError(null);
      const response = await fetch(
        `http://localhost:9999/api/tenders/${tenderId}`,
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch tender details: ${response.statusText}`
        );
      }

      const data = await response.json();
      setSelectedTender(data);
      setShowModal(true);
    } catch (err) {
      setDetailsError(err.message);
      console.error("Error fetching tender details:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleDownloadPdf = (pdfLink, title) => {
    window.open(pdfLink, "_blank");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTender(null);
    setDetailsError(null);
  };

  const categoryBadgeColor = (category) => {
    const colors = {
      Construction: "bg-yellow-100 text-yellow-800",
      IT: "bg-blue-100 text-blue-800",
      HealthCare: "bg-green-100 text-green-800",
      Transport: "bg-purple-100 text-purple-800",
      Event: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // NotLogin component embedded
  const NotLoginComponent = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Not Logged In
          </h2>
          <p className="text-gray-600 mb-6">
            Please login to view available tenders and submit applications.
          </p>
          <a
            href="/login"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Login to Continue
          </a>
        </div>
      </div>
    </div>
  );

  if (!user) return <NotLoginComponent />;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Available Tenders
          </h1>
          {user.role === "admin" && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Create New Tender
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 pl-10 py-2 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Search tenders by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-gray-500" />
              <select
                className="rounded-md border-gray-300 py-2 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Construction">Construction</option>
                <option value="IT">IT</option>
                <option value="HealthCare">HealthCare</option>
                <option value="Transport">Transport</option>
                <option value="Event">Event</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="rounded-md border-gray-300 py-2 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Tenders</option>
                <option value="open">Open Tenders</option>
                <option value="closed">Closed Tenders</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader className="h-8 w-8 text-blue-500 animate-spin" />
              <span className="ml-2 text-gray-600">Loading tenders...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <p>Error: {error}</p>
              <p className="text-sm">
                Please try again later or contact support.
              </p>
            </div>
          ) : filteredTenders.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No tenders found
              </h3>
              <p className="mt-1 text-gray-500">
                {searchTerm ||
                filterCategory !== "all" ||
                filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "There are no tenders available at the moment."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTenders.map((tender) => (
                <div
                  key={tender._id}
                  className={`border rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                    isOpenTender(tender.deadline)
                      ? "border-green-200"
                      : "border-red-200"
                  }`}
                >
                  <div
                    className={`p-2 text-xs font-semibold text-white text-center ${
                      isOpenTender(tender.deadline)
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {isOpenTender(tender.deadline) ? "OPEN" : "CLOSED"}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">
                        {tender.title}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded ml-2 ${categoryBadgeColor(
                          tender.category
                        )}`}
                      >
                        {tender.category}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {tender.description}
                    </p>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          Opening Date: {formatDate(tender.opening_date)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Deadline: {formatDate(tender.deadline)}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-2">
                      <button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                        onClick={() => handleViewDetails(tender._id)}
                      >
                        View Details
                      </button>
                      <button
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-md flex items-center justify-center"
                        onClick={() =>
                          handleDownloadPdf(tender.pdf_link, tender.title)
                        }
                        title="Download Tender Document"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tender Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
            {loadingDetails ? (
              <div className="flex justify-center items-center p-8">
                <Loader className="h-8 w-8 text-blue-500 animate-spin" />
                <span className="ml-2 text-gray-600">
                  Loading tender details...
                </span>
              </div>
            ) : detailsError ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-red-600">
                    Error Loading Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  <p>{detailsError}</p>
                  <p className="text-sm mt-1">
                    Please try again later or contact support.
                  </p>
                </div>
              </div>
            ) : (
              selectedTender && (
                <>
                  <div className="border-b sticky top-0 bg-white z-10">
                    <div className="flex justify-between items-center p-6">
                      <h2 className="text-xl font-bold text-gray-900">
                        Tender Details
                      </h2>
                      <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center mb-6 gap-2">
                      <h3 className="text-2xl font-bold text-gray-900 mr-2">
                        {selectedTender.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${categoryBadgeColor(
                          selectedTender.category
                        )}`}
                      >
                        {selectedTender.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                          isOpenTender(selectedTender.deadline)
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {isOpenTender(selectedTender.deadline)
                          ? "OPEN"
                          : "CLOSED"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-900">
                          Important Dates
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-3">
                            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                            <div>
                              <div className="font-medium">Opening Date</div>
                              <div className="text-gray-600">
                                {formatDate(selectedTender.opening_date)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-red-600" />
                            <div>
                              <div className="font-medium">
                                Submission Deadline
                              </div>
                              <div className="text-gray-600">
                                {formatDate(selectedTender.deadline)}
                              </div>
                              {isOpenTender(selectedTender.deadline) && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {Math.ceil(
                                    (new Date(selectedTender.deadline) -
                                      new Date()) /
                                      (1000 * 60 * 60 * 24)
                                  )}{" "}
                                  days remaining
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-900">
                          Tender Document
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex flex-col">
                            <button
                              onClick={() =>
                                handleDownloadPdf(
                                  selectedTender.pdf_link,
                                  selectedTender.title
                                )
                              }
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center mb-2"
                            >
                              <Download className="w-5 h-5 mr-2" />
                              Download Tender Document
                            </button>
                            <a
                              href={selectedTender.pdf_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 flex items-center justify-center text-sm"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View in browser
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-gray-900">
                        Description
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 whitespace-pre-line">
                          {selectedTender.description}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex justify-between">
                        {isOpenTender(selectedTender.deadline) && (
                          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md">
                            Apply for this Tender
                          </button>
                        )}
                        <button
                          onClick={closeModal}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-md ml-auto"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderHome;
