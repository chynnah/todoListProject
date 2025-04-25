import React from 'react';
import Search from './Search';
import { ThemeToggle } from '../lib/theme';

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="flex justify-end bg-white dark:bg-gray-900 text-[#053C5E] dark:text-gray-200 font-sans transition-colors">
      <div className="flex w-full items-center px-4 py-3 justify-between ml-[50px] md:m-0">
        {/* Logo - hidden on mobile, shown on md+ */}
        <h1 className="font-sans font-extrabold text-[#A31621] text-[20px] md:flex dark:text-[#FF6B7D] md:text-3xl">
          me.list
        </h1>

        {/* Search and Theme toggle */}
        <div className="flex items-center gap-2">
          <div className="w-[140px] sm:w-[160px]">
            <Search onSearch={setSearchQuery} />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>

  );
};

export default Header;