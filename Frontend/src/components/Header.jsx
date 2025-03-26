import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom';
import {BellDot} from 'lucide-react'
const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-6 py-3 header">

        {/* Left Section - Logo */}
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-semibold">UrbanPulse</h1>
        </div>
      
        {/* Right Section - Navigation & Login */}
        <div className="flex items-center gap-x-6">
          <a href="#" className="text-white text-xl hover:text-gray-300">Events</a>
          <a href="#" className="text-white text-xl hover:text-gray-300">Complaints</a>
          <a href="#" className="text-white text-xl hover:text-gray-300">Bills</a>
          <a href="#" className="text-white text-xl hover:text-gray-300">Appointments</a>
          <a href="#" className="text-white text-xl hover:text-gray-300"><BellDot/></a>

          {/* Login Button */}
          <button className="text-white border border-white px-4 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition">
           <Link to={"/auth"}> Login</Link>
          </button>
          <button className="text-white border border-white px-4 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition">
           <Link to={"/signup"}> Signup</Link>
          </button>
        </div>

      </nav>
    </div>
  );
}

export default Header;
