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
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const categories = [
    "Construction",
    "IT",
    "HealthCare",
    "Transport",
    "Education",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus("Please choose a file.");
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
      setStatus("File uploaded ✅. Creating tender...");

      const formattedData = {
        ...formData,
        opening_date: new Date(formData.opening_date).toISOString(),
        deadline: new Date(formData.deadline).toISOString(),
        uuid,
      };

      const backendRes = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/tenders`,
        formattedData
      );

      setStatus("Tender created successfully 🎉");
      console.log("Created Tender:", backendRes.data);

      setFormData({
        title: "",
        description: "",
        category: "",
        opening_date: "",
        deadline: "",
      });
      setFile(null);
    } catch (error) {
      console.error("Error:", error);
      setStatus("Failed to upload or create tender ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Tender</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="TITLE"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="description"
          type="text"
          placeholder="DESCRIPTION"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div>
          <label className="block text-sm font-medium mb-1">Opening Date</label>
          <input
            name="opening_date"
            type="date"
            value={formData.opening_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deadline</label>
          <input
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full"
          required
        />

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {uploading ? "Uploading..." : "Submit Tender"}
        </button>
      </form>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
};

export default TenderForm;
