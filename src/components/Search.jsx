import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); 
  };

  return (
  <div className="border border-[#DDD9D9] relative dark:bg-gray-900 dark:bg-gray-700 dark:border-gray-700 rounded-lg">
    <input
      type="text"
      value={query}
      onChange={handleSearchChange}
      placeholder="Search for task..."
      className="px-3 py-1.5 md:px-4 md:py-2 w-full md:w-[250px] lg:w-[300px] rounded-lg focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-[#FF1654] placeholder-gray-500 text-sm md:text-base"
    />
    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#FF1654] text-sm md:text-base">
      🔍
    </div>
  </div>
  );
};

export default Search;