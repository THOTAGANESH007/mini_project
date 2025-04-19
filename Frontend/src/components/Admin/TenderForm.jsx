import React, { useState } from "react";
import axios from "axios";

const TenderForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    opening_date: "",
    deadline: "",
  });

  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Construction",
    "IT",
    "HealthCare",
    "Transport",
    "Education",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear any error messages when user makes changes
    setError("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus("");
      
      // Display file name
      setFilePreview(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please choose a file");
      return;
    }

    try {
      setUploading(true);
      setStatus("Uploading file...");

      const UPLOADCARE_PUBLIC_KEY = "f85ab610f3cc796fd9e8";

      const fileData = new FormData();
      fileData.append("UPLOADCARE_STORE", "1");
      fileData.append("UPLOADCARE_PUB_KEY", UPLOADCARE_PUBLIC_KEY);
      fileData.append("file", file);

      const uploadRes = await axios.post(
        "https://upload.uploadcare.com/base/",
        fileData
      );

      const uuid = uploadRes.data.file;
      setStatus("File uploaded successfully. Creating tender...");

      const formattedData = {
        ...formData,
        opening_date: new Date(formData.opening_date).toISOString(),
        deadline: new Date(formData.deadline).toISOString(),
        uuid,
      };

      const backendRes = await axios.post(
        "http://localhost:9999/admin/tenders",
        formattedData
      );

      setStatus("Tender created successfully!");
      console.log("Created Tender:", backendRes.data);

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        opening_date: "",
        deadline: "",
      });
      setFile(null);
      setFilePreview(null);
      
      // Success notification that disappears after 3 seconds
      setTimeout(() => {
        setStatus("");
      }, 3000);
      
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to upload or create tender. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white text-center">Create New Tender</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {status && !error && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{status}</p>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Tender Title</label>
            <input
              name="title"
              type="text"
              placeholder="Enter tender title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter tender description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Opening Date</label>
              <input
                name="opening_date"
                type="date"
                value={formData.opening_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Deadline</label>
              <input
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Upload Document</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input 
                      id="file-upload" 
                      name="file" 
                      type="file" 
                      className="sr-only" 
                      onChange={handleFileChange} 
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX up to 10MB
                </p>
                
                {filePreview && (
                  <div className="mt-2 text-indigo-600 text-sm">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      {filePreview}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={uploading}
              className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : "Submit Tender"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenderForm;