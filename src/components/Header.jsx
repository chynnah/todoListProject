import React from 'react';
import Search from './Search';
import { ThemeToggle } from '../lib/theme';

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-white dark:bg-gray-900 text-[#053C5E] dark:text-gray-200 font-sans transition-colors flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5">
      <div className='mt-[5px] md:mt-[10px]'>
        <h1 className='font-sans font-extrabold text-[#A31621] dark:text-[#FF6B7D] text-xl md:text-2xl lg:text-3xl ml-[10px] md:ml-[30px] lg:ml-[50px]'>me.list</h1>
      </div>

      <div className='mt-2 md:mt-0 mr-[10px] md:mr-[20px] lg:mr-[40px] w-full md:w-auto'>
        <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6 relative w-full md:w-auto justify-end">
          {/* Search */}
          <Search onSearch={(query) => {
            setSearchQuery(query);
          }} />
          
          {/* Mode Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;