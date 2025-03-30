import React from 'react';

const Footer = () => {
  return (
    <footer style={{backgroundColor:"#262626"}}className=" text-white py-6 text-center">
      <div className="flex flex-col items-center gap-3 px-4">
        
        {/* Social Media Icons */}
        <div className="flex gap-4 text-2xl">
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-facebook-f"></i>
          <i className="fa-brands fa-whatsapp"></i>
        </div>

        {/* Copyright Text */}
        <div className="text-sm">&copy; {new Date().getFullYear()} UrbanPulse. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
