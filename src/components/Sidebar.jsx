import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ChartColumn, 
  Archive, 
  Smile, 
  Settings, 
  Menu,
  X
} from "lucide-react";

const LogoutConfirmation = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-xs mx-auto">
      <div className="p-5">
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-3">
            <span className="text-xl">🚪</span>
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-base font-medium">
            Are you sure you want to log out?
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-[#A31621] dark:bg-[#FF4757] text-white rounded-lg hover:bg-[#8A1320] dark:hover:bg-[#E03E4E] font-medium text-sm cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Sidebar = ({ isExpanded, setIsExpanded, isMobileView, isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profile_pic") || "");
  const username = localStorage.getItem("username") || "User";
  const userEmail = localStorage.getItem("email") || "user@example.com";

  useEffect(() => {
    const handleProfilePicUpdate = () => {
      setProfilePic(localStorage.getItem("profile_pic") || "");
    };
    window.addEventListener("storage", handleProfilePicUpdate);
    return () => window.removeEventListener("storage", handleProfilePicUpdate);
  }, []);

  const navLinks = [
    { to: "/dashboard", icon: LayoutDashboard, text: "Dashboard" },
    { to: "/dashboard/chart", icon: ChartColumn, text: "Chart" },
    { to: "/dashboard/entertainment", icon: Smile, text: "Entertainment" },
    { to: "/dashboard/archive", icon: Archive, text: "Archive" },
    { to: "/dashboard/settings", icon: Settings, text: "Settings" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleNavLinkClick = () => isMobileView && setIsMenuOpen(false);

  if (isMobileView) {
    return (
      <>
        <div 
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity min-w-screen ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        <div 
          className={`fixed top-0 left-0 h-full z-50 bg-white dark:bg-gray-800 shadow-xl transition-transform w-full  ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div className="flex items-center gap-2">
              <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full border dark:border-gray-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium dark:text-gray-200">{username}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                  {userEmail}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              <X size={18} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          
          <div className="mt-2 px-2">
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ to, icon: Icon, text }) => {
                const isActive = location.pathname === to || (to !== "/dashboard" && location.pathname.startsWith(to));
                return (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={to === "/dashboard"}
                      onClick={handleNavLinkClick}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                        isActive 
                          ? "bg-[#A31621] dark:bg-[#FF4757] text-white" 
                          : "text-[#5E686D] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Icon size={20} className={isActive ? "text-white" : ""} />
                      <span className="text-sm font-medium">{text}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div className="absolute bottom-6 left-0 w-full px-4">
            <button
              onClick={() => setShowConfirmLogout(true)}
              className="w-full py-3 rounded-lg text-[#A31621] dark:text-[#FF4757] border border-[#A31621]/30 dark:border-[#FF4757]/30 hover:bg-[#A31621]/20 dark:hover:bg-[#FF4757]/20 cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
        
        {showConfirmLogout && <LogoutConfirmation onCancel={() => setShowConfirmLogout(false)} onConfirm={handleLogout} />}
      </>
    );
  }

  return (
    <div 
      className={`h-screen fixed bg-white dark:bg-gray-800 shadow-lg border-r dark:border-gray-700 z-20 ${
        isExpanded ? "w-64" : "w-16"
      } transition-all duration-300`}
    >
      <div className="p-4 border-b dark:border-gray-700">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
        >
          <Menu size={24} className="text-gray-600 dark:text-gray-300 mx-auto" />
        </button>
      </div>

      <div className="mt-6 px-2">
        <ul className="flex flex-col gap-[20px]">
          {navLinks.map(({ to, icon: Icon, text }) => {
            const isActive = location.pathname === to || (to !== "/dashboard" && location.pathname.startsWith(to));
            return (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/dashboard"}
                  className={`flex items-center cursor-pointer ${
                    isExpanded ? "gap-3 p-3" : "justify-center p-3"
                  } rounded-lg transition-all ${
                    isActive 
                      ? "bg-[#A31621] dark:bg-[#FF4757] text-white" 
                      : "text-[#5E686D] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-white" : ""} />
                  {isExpanded && <span className="text-sm">{text}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="absolute bottom-4 left-0 w-full flex justify-center">
        <button 
          onClick={() => setShowModal(!showModal)}
          className="p-2 rounded-full border dark:border-gray-700 overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
          <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full" />
        </button>
      </div>
      
      {showModal && (
        <div className="absolute bottom-20 left-16 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-30 border dark:border-gray-700 w-48">
          <div className="flex flex-col">
            <div className="mb-2 pb-2 border-b dark:border-gray-700">
              <p className="text-sm font-medium dark:text-gray-200">{username}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
            </div>
            <button
              onClick={() => {
                setShowConfirmLogout(true);
                setShowModal(false);
              }}
              className="w-full py-1.5 text-[#A31621] dark:text-[#FF4757] hover:bg-[#A31621]/20 dark:hover:bg-[#FF4757]/20 rounded-md text-sm cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      )}
      
      {showConfirmLogout && <LogoutConfirmation onCancel={() => setShowConfirmLogout(false)} onConfirm={handleLogout} />}
    </div>
  );
};

export default Sidebar;