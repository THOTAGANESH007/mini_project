import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader, LoaderCircle } from "lucide-react";
import { CircularProgress } from "@mui/material";

const ComplaintForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "661f9f72e13fdd57b7095a10",
    category: "Electrical",
    email: "",
    phone: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      toast.error("Only image files are allowed");
      e.target.value = null;
      setImage(null);
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    const { email, phone } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be 10 digits");
      return false;
    }
    if (!image) {
      toast.error("Image is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("image", image);

    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/complaints`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success("Complaint submitted successfully!");
      setFormData({
        userId: "661f9f72e13fdd57b7095a10",
        category: "Electrical",
        email: "",
        phone: "",
        description: "",
      });
      setImage(null);
      setImagePreview(null);
      setTimeout(() => navigate("/complaints"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit complaint. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-20 mb-10">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Submit a Complaint
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="Electrical">Electrical</option>
            <option value="Sanitation">Drainage</option>
            <option value="Water_Service">Water Service</option>
          </select>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="10-digit number"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg"
            placeholder="Describe the issue..."
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required
          />
          {imagePreview && (
            <div className="mt-4 relative">
              <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-40 border rounded"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-1 shadow hover:bg-gray-100"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-medium shadow-md transition-colors ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? (
            <CircularProgress className="mx-auto" />
          ) : (
            "Submit Complaint"
          )}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
