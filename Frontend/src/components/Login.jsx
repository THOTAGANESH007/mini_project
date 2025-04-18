import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/UserSlice";
import { useDispatch } from "react-redux";
const Login = ({ setAuthStep }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for API message
  const [isError, setIsError] = useState(false); // Track success or error
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const res = await axios.post(
        "http://localhost:9999/api/user/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data.data);

      if (res.data.success) {
        const user = res.data.data.userObj;
        setMessage(res.data.message);
        setIsError(false);
        dispatch(addUser(user));

        // Redirect based on email
        if (user.email === "admin@gmail.com") {
          navigate("/admin/dashboard");
        } else if (user.email === "waterOfficer123@gmail.com") {
          navigate("/officer/water");
        } else if (user.email === "sanitizationOfficer123@gmail.com") {
          navigate("/officer/sanitation");
        } else if (user.email === "electricOfficer123@gmail.com") {
          navigate("/officer/electric");
        } else {
          navigate("/"); // Default user homepage
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
      setIsError(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md border border-black w-[400px]"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>

        {/* API Response Message */}
        {message && (
          <p
            className={`text-center mb-4 p-2 rounded ${
              isError
                ? "bg-red-200 text-red-700"
                : "bg-green-200 text-green-700"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-black rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-black rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-black transition"
        >
          Login
        </button>

        <p
          onClick={() => navigate("/auth/forgot-password")}
          className="text-blue-600 mt-4 cursor-pointer text-center"
        >
          Forgot Password?
        </p>
      </form>
    </div>
  );
};

export default Login;
