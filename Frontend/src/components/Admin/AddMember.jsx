import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    phoneNumber: "",
    officeAddress: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

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
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));

      // Create image preview
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
    setMessage({ type: "", text: "" });

    const data = new FormData();
    for (let key in formData) {
      if (key === "photo" && formData[key]) {
        data.append("photo", formData[key]); // Changed to "image" as per backend
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/representative/add`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success("Team member added successfully!");

      console.log("Success:", response);
      // setMessage({
      //   type: "success",
      //   text: "Team member added successfully!",
      // });

      // Reset form
      setFormData({
        name: "",
        designation: "",
        email: "",
        phoneNumber: "",
        officeAddress: "",
        photo: null,
      });
      setPreview(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add member. Please try again.");

      // setMessage({
      //   type: "error",
      //   text: "Failed to add member. Please try again.",
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700">
            Add Team Member
          </h2>
          <p className="text-gray-500 mt-1">
            Fill in the details to add a new representative
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
              {/* Image Upload Section */}
              <div className="w-full md:w-1/3">
                <div className="flex flex-col items-center">
                  <div className="mb-4 relative w-40 h-40 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-300">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  <label className="w-full">
                    <div className="flex items-center justify-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span className="text-sm font-medium">Upload Photo</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Basic Information */}
              <div className="w-full md:w-2/3 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation*
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Senior Representative"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="10-digit phone number"
                pattern="[0-9]{10}"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: 10 digits without spaces or dashes
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Office Address*
              </label>
              <textarea
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                rows="3"
                required
                placeholder="Enter complete office address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Status message */}
          {/* {message.text && (
            <div
              className={`mt-6 p-3 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )} */}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: "",
                  designation: "",
                  email: "",
                  phoneNumber: "",
                  officeAddress: "",
                  photo: null,
                });
                setPreview(null);
                setMessage({ type: "", text: "" });
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Clear Form
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  Processing...
                </span>
              ) : (
                "Save Member"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
