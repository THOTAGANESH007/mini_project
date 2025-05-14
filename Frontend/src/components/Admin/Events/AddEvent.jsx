import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  UploadCloud,
  X as CloseIcon,
} from "lucide-react"; // Added icons

const AddEvent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  // const [activeSection, setActiveSection] = useState("basic"); // Not directly used for step control now
  const [formStep, setFormStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    organizer_name: "",
    date: "",
    is_free: "yes", // Default to "yes"
    ticket_price: "",
    registration_link: "",
    img: "", // Will hold filename, actual file in imageFile
  });

  const [imageFile, setImageFile] = useState(null);

  const validateStep = (step) => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (step === 1) {
      if (!form.title.trim()) newErrors.title = "Event name is required";
      if (form.title.trim().length < 3)
        newErrors.title = "Event name must be at least 3 characters";
      if (!form.location.trim()) newErrors.location = "Location is required";
      if (!form.description.trim())
        newErrors.description = "Description is required";
      if (form.description.trim().length < 10)
        newErrors.description = "Description must be at least 10 characters";
    } else if (step === 2) {
      if (!form.organizer_name.trim())
        newErrors.organizer_name = "Organizer name is required";
      if (!form.date) {
        newErrors.date = "Event date is required";
      } else if (form.date < today) {
        newErrors.date = "Event date cannot be in the past";
      }
      if (!form.registration_link.trim()) {
        newErrors.registration_link = "Registration link is required";
      } else {
        try {
          new URL(form.registration_link);
        } catch (_) {
          newErrors.registration_link = "Please enter a valid URL";
        }
      }
    } else if (step === 3) {
      if (form.is_free === "")
        newErrors.is_free = "Please specify if the event is free";
      if (
        form.is_free === "no" &&
        (!form.ticket_price || parseFloat(form.ticket_price) <= 0)
      ) {
        newErrors.ticket_price =
          "Valid ticket price is required for paid events";
      }
      if (!imageFile && !form.img) {
        // Check if either a new file or existing form.img (if editing) is present
        // newErrors.img = "Event image is required"; // Making image optional for now
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(formStep)) {
      setFormStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setFormStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setForm((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "is_free" && value === "yes" && { ticket_price: "" }), // Clear price if free
      }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setImageFile(file);
      setForm((prev) => ({
        ...prev,
        img: file.name, // Store filename for display, actual file in imageFile
      }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);

      if (errors.img) {
        setErrors((prev) => ({ ...prev, img: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (key !== "img") {
        // Don't append form.img directly
        data.append(key, form[key]);
      }
    });

    if (imageFile) {
      data.append("image", imageFile); // 'image' is the field name for multer
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/events`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // If you use cookies/sessions
        }
      );

      toast.success("Event created successfully!");
      setTimeout(() => navigate("/admin/allevents"), 2000);
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Failed to create event. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderProgressSteps = () => (
    <div className="flex flex-wrap justify-between items-center mb-8 px-2">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      {[
        { step: 1, label: "Basic Info" },
        { step: 2, label: "Details" },
        { step: 3, label: "Pricing & Media" },
      ].map(({ step, label }, index, arr) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 font-medium text-xs sm:text-sm
                ${
                  step === formStep
                    ? "border-blue-600 bg-blue-600 text-white"
                    : step < formStep
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
            >
              {step < formStep ? <Check size={16} /> : step}
            </div>
            <span
              className={`mt-1 text-xs text-center ${
                step === formStep
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {label}
            </span>
          </div>
          {index < arr.length - 1 && (
            <div
              className={`flex-1 h-1 mx-1 sm:mx-2 ${
                step < formStep ? "bg-green-500" : "bg-gray-200"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // ... (renderFormFields remains largely the same, ensure all inputs use `w-full`)
  // Minor change in renderFormFields case 3 for image upload section:
  const renderFormFields = () => {
    switch (formStep) {
      case 1: // Basic Information
        return (
          <div className="space-y-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Basic Information
            </h3>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Event Name*
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                placeholder="e.g. Annual Tech Conference"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Location*
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                placeholder="e.g. Grand Convention Hall, Cityville"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Description*
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className={`w-full px-3 py-2 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Briefly describe the event..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-medium"
              >
                Continue <ChevronRight size={20} className="ml-1" />
              </button>
            </div>
          </div>
        );

      case 2: // Event Details
        return (
          <div className="space-y-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Event Details
            </h3>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Organizer Name*
              </label>
              <input
                type="text"
                name="organizer_name"
                value={form.organizer_name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.organizer_name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                placeholder="e.g. Tech Events Inc."
              />
              {errors.organizer_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.organizer_name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Event Date*
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-500">{errors.date}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Registration Link*
              </label>
              <input
                type="url"
                name="registration_link"
                value={form.registration_link}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.registration_link
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                placeholder="https://example.com/register"
              />
              {errors.registration_link && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.registration_link}
                </p>
              )}
            </div>
            <div className="pt-4 flex flex-col sm:flex-row justify-between gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-medium"
              >
                <ChevronLeft size={20} className="mr-1" /> Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-medium"
              >
                Continue <ChevronRight size={20} className="ml-1" />
              </button>
            </div>
          </div>
        );

      case 3: // Pricing & Media
        return (
          <div className="space-y-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Pricing & Media
            </h3>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Is the Event Free?*
              </label>
              <select
                name="is_free"
                value={form.is_free}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.is_free ? "border-red-500" : "border-gray-300"
                } rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="yes">Yes, it's free</option>
                <option value="no">No, it's a paid event</option>
              </select>
              {errors.is_free && (
                <p className="mt-1 text-sm text-red-500">{errors.is_free}</p>
              )}
            </div>
            {form.is_free === "no" && (
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Ticket Price (₹)*
                </label>
                <input
                  type="number"
                  name="ticket_price"
                  value={form.ticket_price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-3 py-2 border ${
                    errors.ticket_price ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="0.00"
                />
                {errors.ticket_price && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.ticket_price}
                  </p>
                )}
              </div>
            )}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Event Image (Optional)
              </label>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                  errors.img ? "border-red-500" : "border-gray-300"
                } border-dashed rounded-lg`}
              >
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mx-auto h-40 rounded-md object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setImageFile(null);
                          setForm((p) => ({ ...p, img: "" }));
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600"
                      >
                        <CloseIcon size={16} />
                      </button>
                    </div>
                  ) : (
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {errors.img && (
                <p className="mt-1 text-sm text-red-500">{errors.img}</p>
              )}
            </div>
            <div className="pt-4 flex flex-col sm:flex-row justify-between gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-medium"
              >
                <ChevronLeft size={20} className="mr-1" /> Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                } text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-medium`}
              >
                {isSubmitting ? "Creating..." : "Create Event"}
                {!isSubmitting && <Check size={20} className="ml-1" />}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl md:max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2" /> Create New
              Event
            </h2>
            <button
              type="button"
              onClick={() => navigate("/admin/allevents")}
              className="text-white opacity-80 hover:opacity-100"
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <div className="pt-6 px-4 sm:px-6">{renderProgressSteps()}</div>
          <form onSubmit={handleSubmit} className="px-4 sm:px-6 pb-8">
            {renderFormFields()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
