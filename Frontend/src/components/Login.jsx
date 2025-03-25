import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });

    try {
      const { data } = await axios.post(
        "http://localhost:9999/api/user/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return;

    try {
      console.log(forgotEmail)
      const { data } = await axios.put("http://localhost:9999/api/user/forgot-password", { email: forgotEmail },
      {
        headers: {
          "Content-Type": "application/json",
         }
      })
    
      setMessage("a reset link has been sent.");
    } catch (error) {
      setMessage("Error sending reset link. Try again.");
      console.error(error.response?.data?.message || error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={forgotMode ? handleForgotPassword : handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-100 border border-black">
        <h2 className="text-3xl font-semibold mb-6">{forgotMode ? "Forgot Password" : "Login"}</h2>

        {forgotMode ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Enter your Email </label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
            {message && <p className="text-green-600">{message}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded border-black border hover:bg-black transition">
              Send Reset Link
            </button>
            <p onClick={() => setForgotMode(false)} className="text-blue-600 mt-4 cursor-pointer text-center">Back to Login</p>
          </>
        ) : (
          <>
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

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded border-black border hover:bg-black transition">
              Login
            </button>

            <p onClick={() => setForgotMode(true)} className="text-blue-600 mt-4 cursor-pointer text-center">Forgot Password?</p>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
