import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "661f9f72e13fdd57b7095a10", // You can set this using JWT or props
    category: "Electrical",
    email: "",
    phone: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Optional: If you are using JWT to get userId
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // const decoded = jwtDecode(token);
        // setFormData((prev) => ({ ...prev, userId: decoded.userId }));
        // Just a placeholder – replace with actual decoding logic
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category", formData.category);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("description", formData.description);
    data.append("userId", formData.userId);
    if (image) {
      data.append("image", image);
    }
  console.log("form data",data)
    try {
      const response = await axios.post(
        "http://localhost:9999/api/complaints",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      alert("Complaint submitted successfully!");

      // Reset form
      setFormData({
        userId: "1234",
        category: "Electrical",
        email: "",
        phone: "",
        description: "",
      });
      setImage(null);
      setImagePreview(null);
      navigate("/complaints");
    } catch (error) {
      console.error("Error submitting complaint:", error.response?.data || error);
      alert("Error submitting complaint. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-20 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit a Complaint</h2>
      
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
            required
          >
            <option value="Electrical">Electrical</option>
            <option value="Sanitation">Drainage</option>
            <option value="Water_Service">Water Service</option>
          </select>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
              placeholder="Your phone number"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
            placeholder="Please describe the issue in detail..."
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 transition-colors hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />
            
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-40 rounded border border-gray-200" 
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;