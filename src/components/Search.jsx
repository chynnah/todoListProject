import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="px-4 py-2 w-[300px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF1654] placeholder-gray-500"
      />
      <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#FF1654]">
        🔍
      </button>
    </form>
  );
};

export default Search;
