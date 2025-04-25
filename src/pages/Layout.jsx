// Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 768);
      
      if (width >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMobileView && isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileView, isMenuOpen]);

  return (
    <div className="bg-[#FDFDFD] dark:bg-gray-900 min-h-screen max-w-screen  flex">
      {!isMobileView && (
        <Sidebar 
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isMobileView={false}
          isMenuOpen={false}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
      
      {isMobileView && (
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-4 left-4 z-30 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md border border-[#A9BFA8]/50 dark:border-gray-700"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3A3960] dark:text-gray-200">
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>
      )}
      
      {isMobileView && (
        <Sidebar 
          isExpanded={true}
          setIsExpanded={setIsExpanded}
          isMobileView={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      <div className={`flex-1 ${
        !isMobileView ? (isExpanded ? "ml-64" : "ml-16") : "ml-0"
      } transition-all duration-300`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;