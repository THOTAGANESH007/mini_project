import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ResetPassword = ({ setAuthStep, userEmail }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate;
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return toast.error("Passwords do not match!");

    try {
      console.log(userEmail, password);
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/reset-password`,
        {
          email: userEmail,
          newPassword: password,
          confirmPassword: confirmPassword,
        }
      );
      console.log("res:", res);

      toast.success(res.data?.message);
      setAuthStep("login");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-8 rounded-lg shadow-md border border-black"
      >
        <h2 className="text-3xl font-semibold mb-6">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-black rounded mb-3"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-3 border border-black rounded"
        />
        <button
          type="submit"
          className="w-full my-3 bg-blue-600 text-white py-3 rounded hover:bg-black transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
