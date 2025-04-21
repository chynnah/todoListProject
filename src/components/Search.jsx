import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="border border-[#DDD9D9] dark:border-gray-700 rounded-lg relative">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search tasks..."
        className="px-3 py-1.5 w-full text-sm bg-transparent rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF1654] placeholder-gray-500 dark:placeholder-gray-400"
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#FF1654]">
        🔍
      </div>
    </div>
  );
};

export default Search;