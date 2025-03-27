import { NavLink } from 'react-router-dom';
import { AlignJustify, LayoutDashboard, ChartColumn, Settings } from 'lucide-react';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

 
  const userEmail = localStorage.getItem('email');
  const profilePic = localStorage.getItem('profilePic'); 

  return (
    <div>
      <div 
        className={`h-screen ${isExpanded ? 'w-60' : 'w-16'} 
        fixed left-0 top-0 bg-[#FDFAF6] shadow-lg transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className='flex items-center justify-between p-4 cursor-pointer' onClick={toggleSidebar}>
          <AlignJustify size={30} color='#3E3F5B' />
        </div>
        <hr className="w-[80%] border-t border-[#3E3F5B] border-opacity-30 mx-auto my-2" />
        
        {/* Sidebar Menu */}
        <ul className='flex flex-col gap-5 px-2 mt-15'>
          <NavLink 
            to="/dashboard" 
            end 
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-[#3E3F5B] text-white" : "text-[#3E3F5B]"}`
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
              `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-[#3E3F5B] text-white" : "text-[#3E3F5B]"}`
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
              `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-[#3E3F5B] text-white" : "text-[#3E3F5B]"}`
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

        {/* Profile Section (Bottom of Sidebar) */}
        <div className="absolute bottom-4 left-0 w-full p-4 flex justify-center items-center">
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <>
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img src={profilePic || 'default-profile-pic.jpg'} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span>{userEmail}</span>
              </>
            ) : (
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img src={profilePic || 'default-profile-pic.jpg'} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
