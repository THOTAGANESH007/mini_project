import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const navigate = useNavigate();

  // Get unique categories from places
  const categories = [...new Set(places.map((place) => place.category))].sort();

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/places`
      );
      setPlaces(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch places", err);
      setError("Failed to load places. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/place/edit/${id}`);
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/admin/places/${id}`
      );
      setPlaces((prev) => prev.filter((place) => place._id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      console.error("Failed to delete place", err);
      setError("Error deleting the place. Please try again.");
    }
  };

  const handleAddNewClick = () => {
    navigate("/admin/addplace");
  };

  // Filter places based on search term and category
  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Manage Places
        </h1>
        <button
          onClick={handleAddNewClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium flex items-center transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Place
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search places by name or location..."
              className="pl-10 py-3 pr-4 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="md:w-1/3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-3 px-4 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredPlaces.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-10 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mt-4">
            No places found
          </h3>
          <p className="text-gray-500 mt-2">
            {places.length === 0
              ? "You haven't added any places yet. Click 'Add New Place' to get started."
              : "No places match your search criteria. Try adjusting your filters."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPlaces.map((place) => (
            <div
              key={place._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={place.imageUrl || "/api/placeholder/400/320"}
                  alt={place.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-white bg-opacity-80 px-2 py-1 rounded-lg text-sm font-medium">
                  {place.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                    {place.name}
                  </h2>
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-600 font-medium">
                      {place.rating || 0}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-3 flex items-center">
                  <svg
                    className="h-4 w-4 text-gray-400 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {place.location}
                </p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {place.description}
                </p>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handleEdit(place._id)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  {deleteConfirmId === place._id ? (
                    <button
                      onClick={() => handleRemove(place._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(place._id)}
                      className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowPlaces;
