import React, { useState } from 'react';

const TenderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    basePrice: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send formData to your server or backend
    console.log('Submitted Data:', formData);
  };

  return (
    <div className="max-w-md mx-auto  bg-white shadow-lg p-6 mt-[140px] mb-[50px] border rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Tenders</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="basePrice">
            Base Price
          </label>
          <input
            type="number"
            name="basePrice"
            id="basePrice"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.basePrice}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1 " htmlFor="file">
            Upload File
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="w-full"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Tender
        </button>
      </form>
    </div>
  );
};

export default TenderForm;
