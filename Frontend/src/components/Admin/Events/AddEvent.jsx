import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddEvent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeSection, setActiveSection] = useState("basic");
  const [formStep, setFormStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    organizer_name: "",
    date: "",
    is_free: "",
    ticket_price: "",
    registration_link: "",
    img: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!form.title.trim()) newErrors.title = "Event name is required";
      if (!form.location.trim()) newErrors.location = "Location is required";
      if (!form.description.trim())
        newErrors.description = "Description is required";
    } else if (step === 2) {
      if (!form.organizer_name.trim())
        newErrors.organizer_name = "Organizer name is required";
      if (!form.date) newErrors.date = "Event date is required";
      if (!form.registration_link.trim())
        newErrors.registration_link = "Registration link is required";
    } else if (step === 3) {
      if (form.is_free === "")
        newErrors.is_free = "Please specify if the event is free";
      if (
        form.is_free === "no" &&
        (!form.ticket_price || form.ticket_price <= 0)
      ) {
        newErrors.ticket_price = "Valid ticket price is required";
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

      if (name === "is_free") {
        const isFree = value === "yes";
        setForm((prev) => ({
          ...prev,
          is_free: value,
          ticket_price: isFree ? "" : prev.ticket_price,
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      }

      // Clear error when field is edited
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setForm((prev) => ({
      ...prev,
      img: file?.name || "",
    }));

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation
    if (!validateStep(formStep)) return;

    setIsSubmitting(true);

    const data = new FormData();
    for (let key in form) {
      data.append(key, form[key]);
    }

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/events`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Event created successfully!");

      setTimeout(() => {
        navigate("/admin/allevents");
      }, 2000);
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );
      setIsSubmitting(false);

      toast.error("Failed to create event. Please try again.");
    }
  };

  // Form section tabs
  const sections = [
    {
      id: "basic",
      label: "Basic Info",
      icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: "details",
      label: "Event Details",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      id: "pricing",
      label: "Pricing",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: "media",
      label: "Media",
      icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
  ];

  const renderProgressSteps = () => {
    return (
      <div className="flex justify-between items-center mb-8 px-2">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
        />
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium ${
                step === formStep
                  ? "border-blue-600 bg-blue-600 text-white"
                  : step < formStep
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-gray-300 bg-white text-gray-500"
              }`}
            >
              {step < formStep ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              ) : (
                step
              )}
            </div>

            {step < 3 && (
              <div
                className={`flex-1 h-1 w-12 mx-2 ${
                  step < formStep ? "bg-green-500" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderFormFields = () => {
    switch (formStep) {
      case 1:
        return (
          <div className="space-y-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Basic Information
            </h3>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Event Name*
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors`}
                placeholder="Enter a descriptive name for your event"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Location*
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors`}
                placeholder="Physical address or online platform"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Description*
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-3 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-lg resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors`}
                placeholder="Describe what the event is about, what attendees can expect, etc."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
              <div className="mt-1 flex justify-between">
                <p className="text-xs text-gray-500">
                  Be descriptive to attract more attendees
                </p>
                <p className="text-xs text-gray-500">
                  {form.description.length} characters
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Continue
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Event Details
            </h3>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Organizer Name*
              </label>
              <input
                type="text"
                name="organizer_name"
                value={form.organizer_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.organizer_name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors`}
                placeholder="Individual or organization hosting the event"
              />
              {errors.organizer_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.organizer_name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Registration Link*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    ></path>
                  </svg>
                </div>
                <input
                  type="url"
                  name="registration_link"
                  value={form.registration_link}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.registration_link
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors`}
                  placeholder="https://example.com/register"
                />
              </div>
              {errors.registration_link && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.registration_link}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Event Date*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors`}
                />
              </div>
              {errors.date && (
                <p className="mt-1 text-sm text-red-500">{errors.date}</p>
              )}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                <svg
                  className="mr-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Continue
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Pricing & Media
            </h3>

            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h4 className="text-md font-medium text-gray-700">
                  Ticket Information
                </h4>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Is the Event Free?*
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() =>
                        handleChange({
                          target: { name: "is_free", value: "yes" },
                        })
                      }
                      className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        form.is_free === "yes"
                          ? "bg-green-50 border-green-500 text-green-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 mr-2 ${
                          form.is_free === "yes"
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span className="font-medium">Yes, Free Event</span>
                    </div>
                    <div
                      onClick={() =>
                        handleChange({
                          target: { name: "is_free", value: "no" },
                        })
                      }
                      className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        form.is_free === "no"
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 mr-2 ${
                          form.is_free === "no"
                            ? "text-blue-500"
                            : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span className="font-medium">No, Paid Event</span>
                    </div>
                  </div>
                  {errors.is_free && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.is_free}
                    </p>
                  )}
                </div>

                {form.is_free === "no" && (
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Ticket Price (₹)*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">₹</span>
                      </div>
                      <input
                        type="number"
                        name="ticket_price"
                        value={form.ticket_price}
                        onChange={handleChange}
                        min="1"
                        className={`w-full pl-8 pr-4 py-3 border ${
                          errors.ticket_price
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-colors`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.ticket_price && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.ticket_price}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h4 className="text-md font-medium text-gray-700">
                  Event Image
                </h4>
              </div>

              <div className="p-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {previewUrl ? (
                    <div className="relative w-full max-w-md">
                      <img
                        src={previewUrl}
                        alt="Event preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setImageFile(null);
                          setForm((prev) => ({ ...prev, img: "" }));
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                      >
                        <svg
                          className="w-5 h-5 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="image-upload"
                      className="w-full flex flex-col items-center"
                    >
                      <svg
                        className="w-12 h-12 text-gray-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="text-sm text-gray-500 text-center mb-1">
                        Click to upload an event image
                      </p>
                      <p className="text-xs text-gray-400 text-center">
                        PNG, JPG or JPEG up to 5MB
                      </p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                <svg
                  className="mr-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white py-3 px-6 rounded-lg font-medium transition-colors`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                    Creating Event...
                  </>
                ) : (
                  <>
                    Create Event
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </>
                )}
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Create New Event
            </h2>
            <button
              type="button"
              onClick={() => navigate("/admin/allevents")}
              className="text-white opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div className="pt-6 px-6">{renderProgressSteps()}</div>

          <form onSubmit={handleSubmit} className="px-6 pb-8">
            {renderFormFields()}
          </form>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            Need help creating your event?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Check out our guide
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
