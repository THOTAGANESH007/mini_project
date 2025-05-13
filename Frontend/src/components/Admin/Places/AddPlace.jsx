import React, { useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddPlace = () => {
  const categories = [
    "Temples",
    "Theatres",
    "Parks",
    "Hotels",
    "Lodges",
    "Restaurants",
    "Gyms",
    "Aquariums",
    "Art Galleries",
    "Museums",
    "Cafes",
    "Malls",
    "Beaches",
    "Zoos",
  ];

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    category: "",
    rating: 0,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const imageInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (let key in form) {
      data.append(key, form[key]);
    }

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/places`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Place added successfully!");

      setForm({
        name: "",
        location: "",
        description: "",
        category: "",
        rating: 0,
      });
      setImage(null);
      setPreview(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      toast.error("Error uploading place.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      {/* {success && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
          <p>Place added successfully!</p>
        </div>
      )} */}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white">Add a New Place</h2>
          <p className="text-blue-100 mt-1">
            Fill in the details to add a tourist attraction
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter place name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="City, State"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Describe this place..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Rating
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                name="rating"
                min="0"
                max="5"
                step="1"
                value={form.rating}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="bg-blue-500 text-white font-medium px-3 py-1 rounded-lg min-w-[2rem] text-center">
                {form.rating}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="mt-2">
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={imageInputRef}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                    >
                      Select an image
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center px-6 py-3 rounded-lg font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            } text-white transition-all`}
          >
            {loading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {loading ? "Saving..." : "Save Place"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlace;
