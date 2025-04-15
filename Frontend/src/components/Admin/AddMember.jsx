import axios from "axios";
import React, { useState } from "react";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    phoneNumber: "",
    officeAddress: "",
    photo: null // previously 'photoFile'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photo: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      if (key === "image" && formData[key]) {
        data.append("image", formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:9999/admin/addRepresentative",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Success:", response);
      alert("Member added successfully!");

      // Reset form
      setFormData({
        name: "",
        designation: "",
        email: "",
        phoneNumber: "",
        officeAddress: "",
        photo: null
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add member. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Add Team Member</h2>

      <div>
        <label className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Designation</label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Office Address</label>
        <textarea
          name="officeAddress"
          value={formData.officeAddress}
          onChange={handleChange}
          rows="4"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Save Member
      </button>
    </form>
  );
};

export default AddMember;
