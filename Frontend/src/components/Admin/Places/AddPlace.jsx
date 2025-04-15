import React, { useRef, useState } from "react";
import axios from "axios";

const AddPlace = () => {
  const categories = [
    "Temples", "Theatres", "Parks", "Hotels", "Lodges", "Restaurants",
    "Gyms", "Aquariums", "Art Galleries", "Museums", "Cafes",
    "Malls", "Beaches", "Zoos"
  ];

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    category: "",
    rating: 0,
  });

  const [image, setImage] = useState(null);
  const imageInputRef = useRef(); // ref for resetting file input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let key in form) {
      data.append(key, form[key]);
    }

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await axios.post("http://localhost:9999/admin/places", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Place added successfully!");
      console.log(res.data);

      // Reset form fields
      setForm({
        name: "",
        location: "",
        description: "",
        category: "",
        rating: 0,
      });
      setImage(null);

      // Clear file input
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading place.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Add a New Place</h2>

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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={imageInputRef}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Rating</label>
        <input
          type="number"
          name="rating"
          min="0"
          max="5"
          step="1"
          value={form.rating}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Save Place
      </button>
    </form>
  );
};

export default AddPlace;
