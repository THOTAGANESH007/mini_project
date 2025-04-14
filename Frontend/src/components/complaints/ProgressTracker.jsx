import React from "react";

const ProgressTracker = () => {
  const steps = ["Pending", "Rejected", "Accepted", "Processing", "Resolved"];
  const currentStep = 2; // Change this value to control progress

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4">
      {/* Step Circles + Lines */}
      <div className="relative flex justify-between items-center mb-4">
        {steps.map((_, index) => (
          <div key={index} className="relative flex-1 flex justify-center items-center">
            {/* Left line */}
            {index !== 0 && (
              <div
                className={`absolute left-0 top-1/2 w-1/2 h-1 transform -translate-y-1/2 ${
                  index <= currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )}

            {/* Step circle */}
            <div
              className={`z-10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                index <= currentStep ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>

            {/* Right line */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute right-0 top-1/2 w-1/2 h-1 transform -translate-y-1/2 ${
                  index < currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex justify-center">
            <div className="text-sm font-medium text-center">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
