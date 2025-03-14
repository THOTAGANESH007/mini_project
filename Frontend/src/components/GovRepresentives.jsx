import React from "react";
import DisplayRepresentatives from "./DisplayRepresentatives";

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

const GovRepresentives = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 mt-[140px] mb-[80px]">
      {data.map((person, index) => (
        <DisplayRepresentatives
          key={index}
          name={person.name}
          email={person.email}
          phoneNumber={person.phoneNumber}
          designation={person.designation}
          photo={person.photo}
        />
      ))}
    </div>
  );
};

export default GovRepresentives;
