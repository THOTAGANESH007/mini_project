import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import VerifyOTP from "./VerifyOTP";
import ResetPassword from "./ResetPassword";

const AuthPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [authStep, setAuthStep] = useState("login"); // Manage auth steps
  const navigate = useNavigate();

  // Function to update auth step and navigate
  const handleAuthStep = (step) => {
    setAuthStep(step);
    if (step === "forgotPassword") navigate("/forgot-password");
    else if (step === "verifyOTP") navigate("/verify-otp");
    else if (step === "resetPassword") navigate("/reset-password");
    else navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<Login setAuthStep={handleAuthStep} />} />
      <Route path="/forgot-password" element={<ForgotPassword setAuthStep={handleAuthStep} setUserEmail={setUserEmail} />} />
      <Route path="/verify-otp" element={<VerifyOTP setAuthStep={handleAuthStep} userEmail={userEmail} setUserEmail={setUserEmail}  />} />
      <Route path="/reset-password" element={<ResetPassword setAuthStep={handleAuthStep} userEmail={userEmail} />} />
    </Routes>
  );
};

export default AuthPage;
