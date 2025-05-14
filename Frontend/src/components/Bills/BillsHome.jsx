import React from "react";
import { useNavigate } from "react-router-dom";
import { Receipt, History } from "lucide-react";
import NotLogin from "../NotLogin";

const BillsHome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCardClick = (name) => {
    if (name === "payBills") {
      navigate("/bills/pay");
    }
    if (name === "history") {
      navigate("/bills/history");
    }
  };

  if (!user) return <NotLogin />;

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-180px)] flex flex-col items-center justify-center">
      {" "}
      {/* Adjusted for footer/header height */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
        Bills Management
      </h1>
      <div className="flex flex-col sm:flex-row gap-8 justify-center items-stretch w-full max-w-2xl">
        {/* Pay Bills Card */}
        <div
          className="w-full sm:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer border border-gray-100 flex flex-col"
          onClick={() => handleCardClick("payBills")}
        >
          <div className="bg-blue-500 p-6 flex justify-center items-center">
            <Receipt size={56} color="white" strokeWidth={1.5} />
          </div>
          <div className="p-6 text-center flex-grow flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Pay Bills
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              View and pay your pending bills
            </p>
          </div>
        </div>

        {/* Bills History Card */}
        <div
          className="w-full sm:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer border border-gray-100 flex flex-col"
          onClick={() => handleCardClick("history")}
        >
          <div className="bg-green-500 p-6 flex justify-center items-center">
            <History size={56} color="white" strokeWidth={1.5} />
          </div>
          <div className="p-6 text-center flex-grow flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Bills History
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Review your payment history
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillsHome;
