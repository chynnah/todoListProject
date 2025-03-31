import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AlignJustify, LayoutDashboard, ChartColumn, Settings, LogOut } from "lucide-react";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const navigate = useNavigate();

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
        fixed left-0 top-0 bg-[#FDFAF6] shadow-lg transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 cursor-pointer" onClick={toggleSidebar}>
          <AlignJustify size={30} color="#3E3F5B" />
        </div>
        <hr className="w-[80%] border-t border-[#3E3F5B] border-opacity-30 mx-auto my-2" />

        <ul className="flex flex-col gap-5 px-2 mt-15">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive ? "bg-[#3E3F5B] text-white" : "text-[#3E3F5B]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <LayoutDashboard size={20} color={isActive ? "white" : "#3E3F5B"} />
                {isExpanded && <span>Dashboard</span>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/chart"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive ? "bg-[#3E3F5B] text-white" : "text-[#3E3F5B]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <ChartColumn size={20} color={isActive ? "white" : "#3E3F5B"} />
                {isExpanded && <span>Reports</span>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition ${
                isActive ? "bg-[#3E3F5B] text-white" : "text-[#3E3F5B]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Settings size={20} color={isActive ? "white" : "#3E3F5B"} />
                {isExpanded && <span>Settings</span>}
              </>
            )}
          </NavLink>
        </ul>

        {/* Profile Section */}
        <div className="absolute bottom-4 left-0 w-full p-4 flex justify-center items-center">
          <div className="relative flex items-center gap-3">
            {isExpanded ? (
              <>
                <div className="h-10 w-10 rounded-full overflow-hidden cursor-pointer" onClick={() => setShowModal(!showModal)}>
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="cursor-pointer text-[#3E3F5B]" onClick={() => setShowModal(!showModal)}>
                  {userEmail}
                </span>
              </>
            ) : (
              <div className="h-10 w-10 rounded-full overflow-hidden cursor-pointer" onClick={() => setShowModal(!showModal)}>
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showModal && (
        <div className="fixed bottom-18 left-10 bg-white shadow-lg rounded-tl-[50px] rounded-tr-[50px] rounded-br-[50px] rounded-bl-[5px] p-2 w-50 z-50">
          <button
            onClick={() => {
              setShowConfirmLogout(true);
              setShowModal(false);
            }}
            className="w-full text-left text-red-500 p-2 hover:bg-gray-100 rounded-md flex justify-evenly"
          >
            Logout <LogOut size={14} className="mt-1"/>
          </button>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-md shadow-lg">
            <p className="mb-4 text-lg font-medium">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowConfirmLogout(false);
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-gray-300 rounded-md bg-[#DDD9D9] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
