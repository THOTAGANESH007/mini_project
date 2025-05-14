import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser, clearUser } from "../utils/UserSlice";
import { Pencil, Save } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
<<<<<<< Updated upstream
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
=======
    const user=JSON.parse(localStorage.getItem("user"));
    const dispatch=useDispatch();
>>>>>>> Stashed changes
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update preview and local state
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));

      // Prepare form data
      const formDataObj = new FormData();
      formDataObj.append("image", file); // 'profile' should match your backend field

      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/upload-profile`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        console.log("Upload successful:", response.data);

        // If backend returns new profile image URL:
        if (response.data.data.profile) {
          dispatch(clearUser());
          dispatch(addUser({ ...user, profile: response.data.data.profile }));
          setPreviewImage(response.data.data.profile);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        // Include profile image URL if you have it
        profile:
          previewImage !== "https://via.placeholder.com/150"
            ? previewImage
            : null,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/update-user`,
        payload,
        { withCredentials: true }
      );

      console.log("Profile updated:", response.data);
      // Optionally show a success message or update Redux store
      dispatch(clearUser());
      dispatch(addUser(response.data.data));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
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
        user.profile && user.profile !== ""
          ? user.profile
          : "https://via.placeholder.com/150"
      );
    }
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-[60px] mt-[140px]">
      {/* Profile Picture */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={previewImage}
            alt="Profile"
            className="w-24 h-24 rounded-full ring-4 ring-blue-500 object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-blue-500  rounded-full p-1 cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
            <Pencil className="text-white" />
          </label>
        </div>
        <h2 className="mt-4 text-xl font-semibold">
          {formData.name || "Your Name"}
        </h2>
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition flex items-center justify-center gap-2"
        >
          <Save className="my-0" />
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
