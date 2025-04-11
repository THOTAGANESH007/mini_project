import React, { useEffect } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { BellDot } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../utils/UserSlice";
import axios from "axios";
const Header = () => {
const user=useSelector((store)=>store.user)
const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = async () => {
  try {
    const res=await axios.get("http://localhost:9999/api/user/logout",{withCredentials:true}); // change this to your actual logout endpoint
    if(res.data.message){
      dispatch(clearUser());
    
      alert(res.data.message)
      navigate("/");
    }
   
    // redirect to login page
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <div className="sticky top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-6 py-3 header">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-semibold"><a href='/'>UrbanPulse</a></h1>
        </div>

        {/* Right Section - Navigation & Login */}
        <div className="flex items-center gap-x-6">
          <Link to="/events" className="text-white text-xl hover:text-gray-300">Events</Link>
          <Link to="/complaints"className="text-white text-xl hover:text-gray-300">Complaints</Link>
          {/* <Link to="/profile"className="text-white text-xl hover:text-gray-300">Profile</Link> */}
          <Link href="#" className="text-white text-xl hover:text-gray-300">Bills</Link>
          <Link href="#" className="text-white text-xl hover:text-gray-300">Appointments</Link>
          <Link href="#" className="text-white text-xl hover:text-gray-300"><BellDot/></Link>

          {/* Login Button */}
         {!user &&  (<div className="flex gap-2">
          <button className="text-white border border-white px-4 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition">
            <Link to={"/auth"}> Login</Link>
          </button>
          <button className="text-white border border-white px-4 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition">
            <Link to={"/signup"}> Signup</Link>
          </button>
          </div>)
}

          {user && (<div className="relative flex items-center gap-2">
  
  
  <div className="relative group">
    <div className="cursor-pointer">
      <img
        alt="User Photo"
        src={user.profile || "https://via.placeholder.com/40"}
        className="w-10 h-10 rounded-full ring-2 ring-white object-cover"
      />
    </div>

    {/* Dropdown */}
    <ul className="absolute right-0 mt-2 w-44 bg-white border text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 invisible">
    <li className="mx-5 my-2 text-sm  sm:block bg-blue-300 rounded">Welcome, {user.name}</li>
      <li className=" hover:bg-gray-100 px-4 py-2">
        <Link to="/profile" className="flex justify-between items-center w-full">
          Profile
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">New</span>
        </Link>
      </li>
      <li className="hover:bg-gray-100 px-4 py-2">
        <Link onClick={()=>handleLogout()} className="block w-full">Logout</Link>
      </li>
    </ul>
  </div>
</div>
)}
        </div>
      </nav>
    </div>
  );
};

export default Header;
