import React from 'react';
import Search from './Search';
import { ThemeToggle } from '../lib/theme';

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-white dark:bg-gray-900 text-[#053C5E] dark:text-gray-200 font-sans transition-colors  flex justify-between items-center px-8 py-5 ">
      <div className='mt-[10px] '>
        <h1 className='font-sans font-extrabold text-[#A31621] dark:text-[#FF6B7D] text-3xl ml-[50px]'>me.list</h1>
      </div>

      <div className='mr-[40px]'>
        <div className="flex items-center space-x-6 relative">
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