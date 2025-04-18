import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [message, setMessage] = useState(""); // State to store API response message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear message before submitting

    try {
      console.log("Signup Attempt:", { email, password, username });
      const res = await axios.post(
        "http://localhost:9999/api/user/register",
        { email, password, name: username, phoneNumber, userType },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data);
      setMessage(res.data.message); // Set success message
    } catch (error) {
      console.error("Error:", error.response);
      setMessage(error.response?.data?.message || "Signup failed!"); // Set error message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-[50px] mb-[80px]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-lg border border-black w-[400px] mx-auto"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">SignUp</h2>

        {message && (
          <p
            className={`text-center mb-4 p-2 rounded ${
              message.includes("User Registration Successful")
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Role</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
            className="w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="MLA">Higher Authority</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded border-black border hover:bg-black transition"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;
