import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const user=useSelector((store)=>store.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(
    "https://via.placeholder.com/150"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    // You can add actual form submission logic here
  };
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        image: null,
      });

      setPreviewImage(
        user.profile && user.profile !== "" ? user.profile : "https://via.placeholder.com/150"
      );
    }
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-[60px] mt-[140px]">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={previewImage}
            alt="Profile"
            className="w-24 h-24 rounded-full ring-4 ring-blue-500 object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer">
            <input type="file" className="hidden" onChange={handleImageChange} />
            ✏️
          </label>
        </div>
        <h2 className="mt-4 text-xl font-semibold">{formData.name || "Your Name"}</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-gray-700">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter your mobile number"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
