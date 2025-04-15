import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPlace = () => {
  const { id } = useParams(); // place ID from URL
  const navigate = useNavigate();

  const categories = [
    "Temples", "Theatres", "Parks", "Hotels", "Lodges", "Restaurants",
    "Gyms", "Aquariums", "Art Galleries", "Museums", "Cafes", "Malls", "Beaches", "Zoos"
  ];

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    category: "",
    image_url: "",
    rating: 0
  });

  const [imageFile, setImageFile] = useState(null);

  // Fetch current data (simulated, replace with actual API)
  useEffect(() => {
    // Simulate fetch
    const fetchPlace = async () => {
      const mockData = {
        name: "Historic Museum",
        location: "Downtown City",
        description: "A beautiful place to explore history.",
        category: "Museums",
        image_url: "https://source.unsplash.com/featured/?museum",
        rating: 4.5
      };
      setForm(mockData);
    };

    fetchPlace();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedForm = { ...form };

    if (imageFile) {
      const imageData = new FormData();
      imageData.append("file", imageFile);
      imageData.append("upload_preset", "your_cloudinary_preset");

      const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: imageData,
      });

      const data = await res.json();
      updatedForm.image_url = data.secure_url;
    }

    console.log("Updated Place:", updatedForm);

    // Send updated data to backend
    // await fetch(`/api/places/${id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedForm),
    // });

    navigate("/places");
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
        {form.image_url && (
          <img
            src={form.image_url}
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
