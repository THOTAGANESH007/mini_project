import React from "react";

const ProgressTracker = ({ status }) => {
  const steps = ["Pending", "Rejected", "Accepted", "Processing", "Resolved"];
  
  // Find current step based on status
  let currentStep = 0;
  for (let i = 0; i < steps.length; i++) {
    if (steps[i] === status) {
      currentStep = i;
      break;
    }
  }

  // Status color mapping
  const getStatusColor = (index) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "current";
    return "upcoming";
  };

  // Define color classes for different states
  const colorClasses = {
    completed: {
      circle: "bg-green-500 text-white border-green-500",
      line: "bg-green-500",
      text: "text-green-700 font-semibold"
    },
    current: {
      circle: "bg-blue-600 text-white border-blue-600",
      line: "bg-gray-300",
      text: "text-blue-700 font-bold"
    },
    upcoming: {
      circle: "bg-white text-gray-500 border-gray-300",
      line: "bg-gray-300", 
      text: "text-gray-500"
    },
    // Special case for rejection path
    rejected: {
      circle: "bg-red-500 text-white border-red-500",
      line: "bg-red-500",
      text: "text-red-700 font-semibold"
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4">
      {/* Step Circles + Lines */}
      <div className="relative flex justify-between items-center mb-6">
        {steps.map((step, index) => {
          // Handle rejection path specially
          const isRejected = status === "Rejected" && index > 0;
          const statusType = isRejected 
            ? (index === 1 ? "rejected" : "upcoming") 
            : getStatusColor(index);
          
          return (
            <div key={index} className="relative flex-1 flex justify-center items-center">
              {/* Left connector line */}
              {index !== 0 && (
                <div
                  className={`absolute left-0 top-1/2 w-1/2 h-1 transform -translate-y-1/2 transition-all duration-500 
                    ${index <= currentStep && !isRejected ? colorClasses.completed.line : 
                     (status === "Rejected" && index === 1) ? colorClasses.rejected.line : 
                     colorClasses.upcoming.line}`}
                />
              )}

              {/* Step circle */}
              <div
                className={`z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 
                  transition-all duration-500 shadow-sm ${colorClasses[statusType].circle}`}
              >
                {index <= currentStep ? (
                  index === currentStep ? (
                    // Current step shows number
                    <span>{index + 1}</span>
                  ) : (
                    // Completed step shows checkmark or X for rejection
                    status === "Rejected" && index === 1 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )
                  )
                ) : (
                  // Upcoming step shows number
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Right connector line */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute right-0 top-1/2 w-1/2 h-1 transform -translate-y-1/2 transition-all duration-500
                    ${index < currentStep && !isRejected ? colorClasses.completed.line : 
                     (status === "Rejected" && index === 0) ? colorClasses.rejected.line : 
                     colorClasses.upcoming.line}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          // Handle rejection path specially
          const isRejected = status === "Rejected" && index > 0;
          const statusType = isRejected 
            ? (index === 1 ? "rejected" : "upcoming") 
            : getStatusColor(index);
            
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className={`text-sm font-medium text-center ${colorClasses[statusType].text}`}>
                {step}
              </div>
              
              {/* Current step indicator */}
              {index === currentStep && (
                <div className="mt-1 w-2 h-2 rounded-full bg-blue-600"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;