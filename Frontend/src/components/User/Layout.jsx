import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  // Determine initial sidebar state based on screen size
  const [isOpenSidebar, setIsOpenSidebar] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpenSidebar(false); // Close sidebar on small screens by default
      } else {
        setIsOpenSidebar(true); // Open sidebar on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on initial mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpenSidebar} setIsOpen={setIsOpenSidebar} />
      <main
        className={`flex-1 transition-all duration-300 overflow-y-auto 
                   ${
                     isOpenSidebar ? "md:ml-64" : "md:ml-16"
                   } pt-4 md:pt-6 px-4 md:px-6`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
