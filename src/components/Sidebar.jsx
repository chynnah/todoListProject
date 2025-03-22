import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AlignJustify, LayoutDashboard, ChartColumn, Settings } from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`h-screen ${isExpanded ? 'w-60' : 'w-16'} fixed left-0 top-0 bg-[#FDFAF6] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300`}>
        {/* Sidebar Header */}
        <div className='flex items-center justify-between p-4 cursor-pointer' onClick={toggleSidebar}>
          <AlignJustify size={30} color='#3E3F5B' />
        </div>
        <hr className="w-[80%] border-t border-[#3E3F5B] border-opacity-30 mx-auto my-2" />
        
        {/* Sidebar Menu */}
        <ul className='flex flex-col gap-5 px-2 mt-15'>
          <NavLink 
            to="/" 
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
            to="/chart"
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
            to="/settings"
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
      </div>
      
      
    </div>
  );
};

export default Sidebar;
