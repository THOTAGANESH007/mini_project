import React from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/"); // Go back to the previous page
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled ❌</h1>
      <p className="mt-4 text-lg">Your transaction was not completed.</p>
      <button
        onClick={goBack}
        className="mt-6 p-2 bg-blue-500 text-white rounded-lg"
      >
        Go Back
      </button>
    </div>
  );
};

export default Cancel;
