import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Brand */}
        {/* <div className="text-xl font-bold">YourBrand</div> */}

        <div className='flex justify-center gap-3'>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-x-twitter"></i>
        <i class="fa-brands fa-facebook-f"></i>
        <i class="fa-brands fa-whatsapp"></i>
        </div>
        <div className="text-sm mt-4 md:mt-0">&copy; {new Date().getFullYear()} UrbanPulse. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
