import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BillsHome = () => {
  const navigate = useNavigate();
  const handleCardClick = (name)=>{
    if(name==="payBills"){
      navigate("/bills/pay");
    }
    if(name==="history"){
      navigate("/bills/history");
    }

  }
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center p-6 mt-[140px] mb-[60px]">
      
      {/* Add New Complaints Card */}
      <div className="w-64 bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-xl transition"
      onClick={()=>handleCardClick("payBills")}>
        <div className="flex flex-col items-center">
          <img
            src="https://img.icons8.com/ios11/512/228BE6/plus.png"
            alt="Add Complaint"
            className="w-30 h-30 mb-4"
          />
         <h2 className="text-xl font-semibold text-gray-800">Pay Bills</h2>
        </div>
      </div>

      {/* History Card */}
      <div className="w-64 bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-xl transition"
      onClick={()=>handleCardClick("history")}>
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5582/5582341.png"
            alt="History"
            className="w-30 h-30 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">Your Bills History</h2>
        </div>
      </div>

    </div>
  );
};

export default BillsHome;
