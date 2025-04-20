import React from "react";
import { useNavigate } from "react-router-dom";
import DisplayRepresentatives from "../DisplayRepresentatives";

const data = [
    { 
      name: "John Anderson", 
      email: "john.anderson@gov.us", 
      phoneNumber: "202-555-0191", 
      designation: "Mayor", 
      photo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    { 
      name: "Sarah Thompson", 
      email: "sarah.thompson@gov.us", 
      phoneNumber: "202-555-0123", 
      designation: "City Council Member", 
      photo: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    { 
      name: "Michael Carter", 
      email: "michael.carter@gov.us", 
      phoneNumber: "202-555-0145", 
      designation: "Governor", 
      photo: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    { 
      name: "Emily White", 
      email: "emily.white@gov.us", 
      phoneNumber: "202-555-0178", 
      designation: "Senator", 
      photo: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    { 
      name: "David Martinez", 
      email: "david.martinez@gov.us", 
      phoneNumber: "202-555-0112", 
      designation: "Congressman", 
      photo: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    { 
      name: "Sarah Johnson", 
      email: "sarah.johnson@gov.us", 
      phoneNumber: "202-555-0198", 
      designation: "Senator", 
      photo: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    { 
      name: "Robert Chang", 
      email: "robert.chang@gov.us", 
      phoneNumber: "202-555-0156", 
      designation: "Mayor", 
      photo: "https://randomuser.me/api/portraits/men/10.jpg"
    },
    { 
      name: "Emily Carter", 
      email: "emily.carter@gov.us", 
      phoneNumber: "202-555-0174", 
      designation: "Governor", 
      photo: "https://randomuser.me/api/portraits/women/7.jpg"
    },
    { 
      name: "James Anderson", 
      email: "james.anderson@gov.us", 
      phoneNumber: "202-555-0139", 
      designation: "City Council Member", 
      photo: "https://randomuser.me/api/portraits/men/8.jpg"
    }
  ];

const RepresentativesPreview = () => {
  const navigate = useNavigate();
  const previewData = data.slice(0, 3); // Show first 5 only

  return (
    <div className="max-w-7xl mx-auto bg-gray-100 p-8 rounded shadow-xl mt-[14px] mb-[8px]">
      <h1 className="text-3xl font-bold text-center mb-6 ">
        Government Representatives
      </h1>

      <div className="overflow-x-auto px-4 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
  <div className="flex gap-12 flex-nowrap">
    {previewData.map((person, index) => (
      <div key={index} className="flex-shrink-0 w-[300px]">
        <DisplayRepresentatives
          name={person.name}
          email={person.email}
          phoneNumber={person.phoneNumber}
          designation={person.designation}
          photo={person.photo}
        />
      </div>
    ))}
  </div>
</div>


      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/officials")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
        >
          View All Officials
        </button>
      </div>
    </div>
  );
};

export default RepresentativesPreview;
