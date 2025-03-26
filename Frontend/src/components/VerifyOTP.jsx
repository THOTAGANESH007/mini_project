import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const VerifyOTP = ({ setAuthStep, userEmail,setUserEmail }) => {
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);
 const navigate = useNavigate();
  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/, ""); // Allow only numbers
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next field if current field is filled
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join(""); // Convert array to string
    if (enteredOtp.length !== OTP_LENGTH) {
      alert("Please enter the full OTP.");
      return;
    }

    try {
      console.log(userEmail);
      console.log(enteredOtp);
      await axios.put("http://localhost:9999/api/user/verify-forgot-password-otp", { email: userEmail, otp: enteredOtp });
      setAuthStep("resetPassword");
      setUserEmail(userEmail);
      navigate("/auth/reset-password");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleVerifyOTP} className="bg-white p-8 rounded-lg shadow-md border border-black">
        <h2 className="text-3xl font-semibold mb-6 text-center">Verify OTP</h2>
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl border border-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ))}
        </div>
        <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-3 rounded hover:bg-black transition">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
