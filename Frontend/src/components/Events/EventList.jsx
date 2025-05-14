import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventList = () => {
  const navigate = useNavigate();

  const generateStatus = (date) => {
    const inputDate = new Date(date);
    const today = new Date();

    const inputDateOnly = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate()
    );
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (inputDateOnly > todayOnly) return "Scheduled";
    if (inputDateOnly.getTime() === todayOnly.getTime()) return "Ongoing";
    return "Completed";
  };

  const statusStyles = {
    Scheduled: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    Ongoing: "bg-blue-100 text-blue-700 border border-blue-300",
    Completed: "bg-green-100 text-green-700 border border-green-300",
    Cancelled: "bg-red-100 text-red-700 border border-red-300",
  };

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterDate, setFilterDate] = useState({ start: "", end: "" });
  const [filterPrice, setFilterPrice] = useState({
    min: "",
    max: "",
    freeOnly: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const eventsPerPage = 9;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/events`
        );
        setEvents(res.data);
        setFilteredEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch events", err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleFilter = () => {
    let filtered = [...events];

    // Date range filter
    if (filterDate.start) {
      const startDate = new Date(filterDate.start);
      filtered = filtered.filter((e) => new Date(e.date) >= startDate);
    }

    if (filterDate.end) {
      const endDate = new Date(filterDate.end);
      filtered = filtered.filter((e) => new Date(e.date) <= endDate);
    }

    // Price range filter
    if (filterPrice.min) {
      filtered = filtered.filter(
        (e) => !e.is_free && e.ticket_price >= parseFloat(filterPrice.min)
      );
    }

    if (filterPrice.max) {
      filtered = filtered.filter(
        (e) => !e.is_free && e.ticket_price <= parseFloat(filterPrice.max)
      );
    }

    // Free only
    if (filterPrice.freeOnly) {
      filtered = filtered.filter((e) => e.is_free);
    }

    setFilteredEvents(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilterDate({ start: "", end: "" });
    setFilterPrice({ min: "", max: "", freeOnly: false });
    setFilteredEvents(events);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Events Explorer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover and filter through our upcoming and past events
          </p>
        </div>

        {/* Filters Panel */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Filter Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Filter */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Date Range</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    value={filterDate.start}
                    onChange={(e) =>
                      setFilterDate((prev) => ({
                        ...prev,
                        start: e.target.value,
                      }))
                    }
                    className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">To</label>
                  <input
                    type="date"
                    value={filterDate.end}
                    onChange={(e) =>
                      setFilterDate((prev) => ({
                        ...prev,
                        end: e.target.value,
                      }))
                    }
                    className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Price Range (₹)</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Min
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filterPrice.min}
                    onChange={(e) =>
                      setFilterPrice((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Max
                  </label>
                  <input
                    type="number"
                    placeholder="5000"
                    value={filterPrice.max}
                    onChange={(e) =>
                      setFilterPrice((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Free Only & Buttons */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Options</h3>
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="freeOnly"
                  checked={filterPrice.freeOnly}
                  onChange={(e) =>
                    setFilterPrice((prev) => ({
                      ...prev,
                      freeOnly: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="freeOnly" className="text-gray-700">
                  Show Only Free Events
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleFilter}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex-1 font-medium"
                >
                  Apply Filters
                </button>
                <button
                  onClick={resetFilters}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Events{" "}
            <span className="text-gray-500">({filteredEvents.length})</span>
          </h2>
          <div className="text-sm text-gray-600">
            Showing {indexOfFirst + 1}-
            {Math.min(indexOfLast, filteredEvents.length)} of{" "}
            {filteredEvents.length} events
          </div>
        </div>

        {/* Event Cards */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.length === 0 ? (
              <div className="col-span-full py-12 text-center">
                <div className="text-gray-400 text-5xl mb-4">📭</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No events found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            ) : (
              currentEvents.map((event) => (
                <div
                  key={event._id}
                  onClick={() => navigate(`/event/${event._id}`)}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={
                        event.img ||
                        "https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1470&auto=format&fit=crop"
                      }
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <span
                      className={`absolute top-3 right-3 inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        statusStyles[generateStatus(event.date)]
                      }`}
                    >
                      {generateStatus(event.date)}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                      {event.title}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-1">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <p className="text-sm truncate">{event.location}</p>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="text-sm">
                        {new Date(event.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="font-bold">
                        {event.is_free ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          <span>₹{event.ticket_price}</span>
                        )}
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredEvents.length > 0 && (
          <div className="mt-10 flex justify-center">
            <nav
              className="inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {totalPages <= 7 ? (
                Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === idx + 1
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    } text-sm font-medium`}
                  >
                    {idx + 1}
                  </button>
                ))
              ) : (
                // Complex pagination logic for many pages
                <>
                  {[...Array(Math.min(3, currentPage - 1))].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {currentPage > 4 && (
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                  )}

                  {currentPage >= 4 && currentPage <= totalPages - 3 && (
                    <button
                      onClick={() => setCurrentPage(currentPage)}
                      className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      {currentPage}
                    </button>
                  )}

                  {currentPage < totalPages - 3 && (
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                  )}

                  {[...Array(Math.min(3, totalPages - currentPage))].map(
                    (_, idx) => {
                      const pageNum = totalPages - 2 + idx;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border ${
                            currentPage === pageNum
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          } text-sm font-medium`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                </>
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
