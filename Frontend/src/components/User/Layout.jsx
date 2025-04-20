import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpenSidebar} setIsOpen={setIsOpenSidebar} />
      <div
        className={`flex-1 transition-all duration-300`}
        style={{ marginLeft: isOpenSidebar ? "16rem" : "4rem" }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
