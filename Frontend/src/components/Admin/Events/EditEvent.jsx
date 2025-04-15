import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    organizer_name: "",
    date: "",
    is_free: "yes",
    ticket_price: "",
    img: "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Simulate fetching existing event data
    const fetchEvent = async () => {
      const mockData = {
        name: "Music Concert",
        location: "City Hall",
        description: "A grand musical night",
        organizer_name: "EventPro",
        date: "2025-04-25",
        is_free: "no",
        ticket_price: "100",
        img: "https://source.unsplash.com/featured/?concert",
      };
      setForm(mockData);
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
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
      updatedForm.img = data.secure_url;
    }

    console.log("Updated Event:", updatedForm);

    // Simulate API call
    // await fetch(`/api/events/${id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedForm),
    // });

    navigate("/events");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Edit Event</h2>

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
        <label className="block text-gray-700 mb-1">Organizer Name</label>
        <input
          type="text"
          name="organizer_name"
          value={form.organizer_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Is the Event Free?</label>
        <select
          name="is_free"
          value={form.is_free}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Ticket Price</label>
        <input
          type="number"
          name="ticket_price"
          value={form.ticket_price}
          onChange={handleChange}
          disabled={form.is_free === "yes"}
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
        {form.img && (
          <img
            src={form.img}
            alt="Event Preview"
            className="mt-3 rounded-lg w-full h-48 object-cover"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Update Event
      </button>
    </form>
  );
};

export default EditEvent;
