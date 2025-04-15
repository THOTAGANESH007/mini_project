import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const categories = [
  "Temples", "Theatres", "Parks", "Hotels", "Lodges", "Restaurants",
  "Gyms", "Aquariums", "Art Galleries", "Museums", "Cafes", "Malls", "Beaches", "Zoos"
];

const EditPlace = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    category: "",
    rating: 0,
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);

  // 🔹 Fetch place details from backend
  const fetchPlaceDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:9999/admin/places/${id}`);
      const data = res.data;

      setForm({
        name: data.name,
        location: data.location,
        description: data.description,
        category: data.category,
        rating: data.rating,
        imageUrl: data.imageUrl,
      });
    } catch (error) {
      console.error("Error fetching place:", error);
      alert("Failed to load place data.");
    }
  };

  useEffect(() => {
    fetchPlaceDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("location", form.location);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("rating", form.rating);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await axios.put(
        `http://localhost:9999/admin/places/${id}`,
        formData
      );

      alert("Place updated successfully!");
      navigate("/admin/allplaces");
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong while updating the place.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Edit Place</h2>

      <div>
        <label className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Rating</label>
        <input
          type="number"
          name="rating"
          min="0"
          max="5"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Change Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="mt-3 rounded-lg w-full h-48 object-cover"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Update Place
      </button>
    </form>
  );
};

export default EditPlace;
