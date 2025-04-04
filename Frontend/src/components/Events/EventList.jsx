import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Sample data
const allEvents = Array.from({ length: 50 }, (_, i) => ({
  _id: i + 1,
  title: `Event ${i + 1}`,
  description: `Description for event ${i + 1}`,
  location: `City ${i + 1}`,
  date: new Date(2025, 3, (i % 30) + 1),
  is_free: i % 3 === 0,
  ticket_price: i % 3 === 0 ? 0 : Math.floor(Math.random() * 1000 + 100),
}));

const EventList = () => {
  const navigate = useNavigate();

  const [events] = useState(allEvents);
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [filterDate, setFilterDate] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  // Apply filters only when the "Apply Filters" button is clicked
  const handleFilter = () => {
    let filtered = [...events];

    if (filterDate) {
      const selectedDate = new Date(filterDate).toDateString();
      filtered = filtered.filter(
        (e) => new Date(e.date).toDateString() === selectedDate
      );
    }

    if (filterPrice) {
      filtered = filtered.filter(
        (e) =>
          (filterPrice === "free" && e.is_free) ||
          (filterPrice === "paid" && !e.is_free)
      );
    }

    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Pagination logic
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Event List</h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Events */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEvents.length === 0 ? (
          <p className="col-span-full text-center text-red-500">
            No events found.
          </p>
        ) : (
          currentEvents.map((event) => (
            <div
              key={event._id}
              onClick={() => navigate(`/event/${event._id}`)}
              className="border rounded-xl shadow-md p-4 hover:shadow-lg cursor-pointer transition"
            >
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-sm text-gray-500">Location: {event.location}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="mt-2 font-medium">
                Price:{" "}
                {event.is_free ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `₹${event.ticket_price}`
                )}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-4">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === idx + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventList;
