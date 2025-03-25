
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import { useState } from "react";

const Layout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#FDFAF6] min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      
      {/* Main content wrapper */}
      <div 
        className={`flex-1 transition-all duration-300 ${isExpanded ? "ml-60" : "ml-16"}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
