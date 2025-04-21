import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

const Layout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width >= 768 && width < 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Calculate margin based on screen size and sidebar state
  const getMargin = () => {
    switch (screenSize) {
      case "mobile":
        return isExpanded ? "ml-52" : "ml-12";
      case "medium":
        return isExpanded ? "ml-56" : "ml-14";
      case "desktop":
      default:
        return isExpanded ? "ml-60" : "ml-14";
    }
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Main content wrapper */}
      <div
        className={`flex-1 transition-all duration-300 ${getMargin()}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;