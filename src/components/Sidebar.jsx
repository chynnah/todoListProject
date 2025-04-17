import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AlignJustify, LayoutDashboard, ChartColumn, Archive, Smile, Settings,  LogOut } from "lucide-react";
import { useTheme } from "../lib/theme";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Check for mobile/tablet viewport
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      
      // Auto-collapse sidebar on mobile/tablet
      if (window.innerWidth < 768 && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isExpanded, setIsExpanded]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profile_pic") || "default-profile-pic.jpg"
  );

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const handleProfilePicUpdate = () => {
      setProfilePic(localStorage.getItem("profile_pic") || "default-profile-pic.jpg");
    };
  
    window.addEventListener("storage", handleProfilePicUpdate);
  
    return () => {
      window.removeEventListener("storage", handleProfilePicUpdate);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });

    setTimeout(() => {
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        window.history.pushState(null, null, window.location.href);
      };
    }, 0);
  };
  
  // Function to close sidebar when clicking a link on mobile
  const handleNavLinkClick = () => {
    if (isMobile && isExpanded) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Mobile overlay to close sidebar when clicking outside */}
      {isMobile && isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsExpanded(false)}
        />
      )}
    
      <div
        className={`h-screen ${isExpanded ? "w-60" : "w-16"} 
        fixed left-0 top-0 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 
        border-r border-[#A9BFA8]/50 dark:border-gray-700 z-30
        ${isMobile && !isExpanded ? "w-14" : isMobile ? "w-64" : ""}`}
      >
        <div className="flex items-center justify-between p-4 cursor-pointer" onClick={toggleSidebar}>
          <AlignJustify size={30} className="text-[#3A3960] dark:text-gray-200" />
        </div>
        <hr className="w-[80%] border-t border-[#A9BFA8] border-opacity-50 dark:border-gray-700 mx-auto my-2" />

        <ul className="flex flex-col gap-5 px-2 mt-5">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive 
                  ? "bg-[#A31621] dark:bg-[#FF4757] text-white" 
                  : "text-[#5E686D] dark:text-gray-300 hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-700"
              }`
            }
            onClick={handleNavLinkClick}
          >
            {({ isActive }) => (
              <>
                <LayoutDashboard size={20} className={isActive ? "text-white" : "text-[#5E686D] dark:text-gray-300"} />
                {isExpanded && <span>Dashboard</span>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/chart"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive 
                  ? "bg-[#A31621] dark:bg-[#FF4757] text-white" 
                  : "text-[#5E686D] dark:text-gray-300 hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-700"
              }`
            }
            onClick={handleNavLinkClick}
          >
            {({ isActive }) => (
              <>
                <ChartColumn size={20} className={isActive ? "text-white" : "text-[#5E686D] dark:text-gray-300"} />
                {isExpanded && <span>Chart</span>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/entertainment"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive 
                  ? "bg-[#A31621] dark:bg-[#FF4757] text-white" 
                  : "text-[#5E686D] dark:text-gray-300 hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-700"
              }`
            }
            onClick={handleNavLinkClick}
          >
            {({ isActive }) => (
              <>
                <Smile size={20} className={isActive ? "text-white" : "text-[#5E686D] dark:text-gray-300"} />
                {isExpanded && <span>Entertainment</span>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/archive"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive 
                  ? "bg-[#A31621] dark:bg-[#FF4757] text-white" 
                  : "text-[#5E686D] dark:text-gray-300 hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-700"
              }`
            }
            onClick={handleNavLinkClick}
          >
            {({ isActive }) => (
              <>
                <Archive size={20} className={isActive ? "text-white" : "text-[#5E686D] dark:text-gray-300"} />
                {isExpanded && <span>Archive</span>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive 
                  ? "bg-[#A31621] dark:bg-[#FF4757] text-white" 
                  : "text-[#5E686D] dark:text-gray-300 hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-700"
              }`
            }
            onClick={handleNavLinkClick}
          >
            {({ isActive }) => (
              <>
                <Settings size={20} className={isActive ? "text-white" : "text-[#5E686D] dark:text-gray-300"} />
                {isExpanded && <span>Settings</span>}
              </>
            )}
          </NavLink>
        </ul>

        {/* Profile Section */}
        <div className="absolute bottom-4 left-0 w-full p-4 flex justify-center items-center hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-700 transition rounded-md">
          <div className="relative flex items-center gap-3">
            {isExpanded ? (
              <>
                <div className="h-10 w-10 rounded-full overflow-hidden cursor-pointer border border-[#A9BFA8] dark:border-gray-600" onClick={() => setShowModal(!showModal)}>
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="cursor-pointer text-[#5E686D] dark:text-gray-300 hover:text-[#3A3960] dark:hover:text-gray-100 truncate max-w-32" onClick={() => setShowModal(!showModal)}>
                  {userEmail}
                </span>
              </>
            ) : (
              <div className="h-10 w-10 rounded-full overflow-hidden cursor-pointer border border-[#A9BFA8] dark:border-gray-600" onClick={() => setShowModal(!showModal)}>
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showModal && (
        <div className="fixed bottom-20 left-9 bg-white dark:bg-gray-700 shadow-lg rounded-tl-[50px] rounded-tr-[50px] rounded-br-[50px] rounded-bl-[5px] ml-[20px] p-3 w-56 z-50 border border-[#A9BFA8] dark:border-gray-600">
         <button
            onClick={() => {
              setShowConfirmLogout(true);
              setShowModal(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-4  text-[#A31621] dark:text-[#FF4757] hover:bg-[#A31621]/10 dark:hover:bg-[#FF4757]/10 rounded-lg  group"
          >
            <span className="group-hover:scale-110 transition-transform duration-200">👋</span>
            <span className="font-medium">Wanna log out?</span>
          </button>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md relative border border-gray-200 dark:border-gray-700 transition-all duration-300">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-[#053C5E] dark:text-gray-200">
                Confirm Logout
              </h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
                  <span className="text-2xl">🚪</span>
                </div>
                <p className="text-[#053C5E] dark:text-gray-300">
                  Are you sure you want to log out?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowConfirmLogout(false);
                    setShowModal(false);
                  }}
                  className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-[#053C5E] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 bg-[#A31621] dark:bg-[#FF4757] text-white rounded-lg hover:bg-[#8A1320] dark:hover:bg-[#E03E4E] transition-colors duration-200 font-medium"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;