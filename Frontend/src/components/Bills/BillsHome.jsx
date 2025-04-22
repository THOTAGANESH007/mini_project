import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, History } from 'lucide-react';

const BillsHome = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (name) => {
    if (name === "payBills") {
      navigate("/bills/pay");
    }
    if (name === "history") {
      navigate("/bills/history");
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Bills Management</h1>
      
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Pay Bills Card */}
        <div 
          className="w-full max-w-xs bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer border border-gray-100"
          onClick={() => handleCardClick("payBills")}
        >
          <div className="bg-blue-500 p-5 flex justify-center">
            <Receipt size={64} color="white" strokeWidth={1.5} />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Pay Bills</h2>
            <p className="text-gray-600">View and pay your pending bills</p>
          </div>
        </div>

        {/* Bills History Card */}
        <div 
          className="w-full max-w-xs bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer border border-gray-100"
          onClick={() => handleCardClick("history")}
        >
          <div className="bg-green-500 p-5 flex justify-center">
            <History size={64} color="white" strokeWidth={1.5} />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Bills History</h2>
            <p className="text-gray-600">Review your payment history</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillsHome;