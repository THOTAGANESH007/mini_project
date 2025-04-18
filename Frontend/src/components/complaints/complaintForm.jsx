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
    setImage(e.target.files[0]);
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
      navigate("/complaints");
    } catch (error) {
      console.error("Error submitting complaint:", error.response?.data || error);
      alert("Error submitting complaint. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-[140px] mb-[50px]">
      <h2 className="text-2xl font-bold mb-4">New Complaint</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Electrical">Electrical</option>
            <option value="Sanitation">Drainage</option>
            <option value="Water_Service">Water Service</option>
            {/* <option value="Other">Other</option> */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
