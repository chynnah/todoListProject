import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AlignJustify, LayoutDashboard, ChartColumn, Archive, Smile, Settings, Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/theme";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();


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

  return (
    <>
      <div
        className={`h-screen ${isExpanded ? "w-60" : "w-16"} 
        fixed left-0 top-0 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 
        border-r border-[#A9BFA8]/50 dark:border-gray-700`}
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
                  ? "bg-[#3A3960] dark:bg-gray-700 text-[#FAFFC5] dark:text-gray-200" 
                  : "text-[#5E686D] dark:text-gray-300 hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <LayoutDashboard size={20} className={isActive ? "text-[#FAFFC5] dark:text-gray-200" : "text-[#5E686D] dark:text-gray-300"} />
                {isExpanded && <span>Dashboard</span>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/chart"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive 
                  ? "bg-[#3A3960] dark:bg-gray-700 text-[#FAFFC5] dark:text-gray-200" 
                  : "text-[#5E686D] dark:text-gray-300 hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <ChartColumn size={20} className={isActive ? "text-[#FAFFC5] dark:text-gray-200" : "text-[#5E686D] dark:text-gray-300"} />
                {isExpanded && <span>Chart</span>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/entertainment"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive 
                  ? "bg-[#3A3960] dark:bg-gray-700 text-[#FAFFC5] dark:text-gray-200" 
                  : "text-[#5E686D] dark:text-gray-300 hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Smile size={20} className={isActive ? "text-[#FAFFC5] dark:text-gray-200" : "text-[#5E686D] dark:text-gray-300"} />
                {isExpanded && <span>Entertainment</span>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/archive"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive 
                  ? "bg-[#3A3960] dark:bg-gray-700 text-[#FAFFC5] dark:text-gray-200" 
                  : "text-[#5E686D] dark:text-gray-300 hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Archive size={20} className={isActive ? "text-[#FAFFC5] dark:text-gray-200" : "text-[#5E686D] dark:text-gray-300"} />
                {isExpanded && <span>Archive</span>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive 
                  ? "bg-[#3A3960] dark:bg-gray-700 text-[#FAFFC5] dark:text-gray-200" 
                  : "text-[#5E686D] dark:text-gray-300 hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Settings size={20} className={isActive ? "text-[#FAFFC5] dark:text-gray-200" : "text-[#5E686D] dark:text-gray-300"} />
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
                <span className="cursor-pointer text-[#5E686D] dark:text-gray-300 hover:text-[#3A3960] dark:hover:text-gray-100" onClick={() => setShowModal(!showModal)}>
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
        <div className="fixed bottom-20 left-9 bg-[#FAFFC5] dark:bg-gray-700 shadow-lg rounded-tl-[50px] rounded-tr-[50px] rounded-br-[50px] rounded-bl-[5px] p-3 w-56 z-50 animate-fade-in-up border border-[#A9BFA8] dark:border-gray-600">
          <button
            onClick={() => {
              setShowConfirmLogout(true);
              setShowModal(false);
            }}
            className="w-full text-center text-[#3A3960] dark:text-gray-200 cursor-pointer font-medium p-2 hover:bg-[#A9BFA8]/30 dark:hover:bg-gray-600 rounded-md transition"
          >
            Wanna log out? 🧐
          </button>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-[#FAFFC5] dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md text-center animate-pop-in border border-[#A9BFA8] dark:border-gray-700">
            <p className="mb-6 text-xl font-semibold text-[#3A3960] dark:text-gray-200">
              Whoa, hold up! You sure you wanna leave? 😲
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowConfirmLogout(false);
                  setShowModal(false);
                }}
                className="px-5 py-2.5 bg-[#A9BFA8]/30 dark:bg-gray-700 text-[#3A3960] dark:text-gray-200 cursor-pointer rounded-lg hover:bg-[#A9BFA8]/50 dark:hover:bg-gray-600 transition border border-[#A9BFA8] dark:border-gray-600"
              >
                Nah, I'll stay 😎
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-[#3A3960] dark:bg-blue-600 text-[#FAFFC5] dark:text-white rounded-lg cursor-pointer hover:bg-[#3A3960]/90 dark:hover:bg-blue-700 transition"
              >
                Yeah, I'm out! 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;