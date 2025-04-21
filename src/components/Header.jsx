import React from 'react';
import Search from './Search';
import { ThemeToggle } from '../lib/theme';

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-white dark:bg-gray-900 text-[#053C5E] dark:text-gray-200 font-sans transition-colors">
      {/* Mobile view */}
      <div className="md:hidden flex flex-row justify-between items-center px-4 py-3">
        {/* Logo on left */}
        <h1 className="font-sans font-extrabold text-[#A31621] dark:text-[#FF6B7D] text-2xl">me.list</h1>
        
        {/* Search and Theme toggle on right */}
        <div className="flex items-center gap-2">
          <div className="w-[140px] sm:w-[160px]">
            <Search onSearch={setSearchQuery} />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Medium screen view */}
      <div className="hidden md:flex lg:hidden flex-row justify-between items-center px-5 py-4">
        <div>
          <h1 className="font-sans font-extrabold text-[#A31621] dark:text-[#FF6B7D] text-2xl">me.list</h1>
        </div>
        <div className="flex items-center space-x-3 relative w-auto justify-end">
          <div className="w-[180px]">
            <Search onSearch={setSearchQuery} />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:flex flex-row justify-between items-center px-6 lg:px-8 py-4 lg:py-5">
        <div className="mt-2">
          <h1 className="font-sans font-extrabold text-[#A31621] dark:text-[#FF6B7D] text-3xl">me.list</h1>
        </div>
        <div className="flex items-center space-x-6 relative w-auto justify-end">
          <Search onSearch={setSearchQuery} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;