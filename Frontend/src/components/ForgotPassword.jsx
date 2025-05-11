import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const ForgotPassword = ({ setAuthStep, setUserEmail }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
   
      e.preventDefault();
    try {
        console.log("email:",email);
     const res= await axios.put("http://localhost:9999/api/user/forgot-password", { email });
     console.log("res:",res);

        toast.success(res.data?.message);
        setUserEmail(email); // Store email for next step
        setAuthStep("verifyOTP");
        navigate("/auth/verify-otp");
        
     
    } catch (error) {
      toast.error(error.response?.data?.message);
    console.log(error)
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
      <form onSubmit={handleForgotPassword} className="bg-white p-8 rounded-lg shadow-md border border-black">
        <h2 className="text-3xl font-semibold mb-6">Forgot Password</h2>
        <label className="block text-gray-700 mb-2">Enter your Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border border-black rounded" />
        <button type="submit" className="w-full bg-blue-600 my-3 text-white py-3 rounded hover:bg-black transition">Send OTP</button>
        <p onClick={() => setAuthStep("login")} className="text-blue-600 mt-4 cursor-pointer text-center">Back to Login</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
