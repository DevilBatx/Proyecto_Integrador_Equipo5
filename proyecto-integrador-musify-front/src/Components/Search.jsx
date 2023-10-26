import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchProduct, setSearchProduct] = useState('');

  const handleSearch = () => {
    onSearch(searchProduct);
  }

  return (
    <div className="flex items-center h-40 justify-end">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="border border-gray-300 p-2 mr-2"
        value={searchProduct}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-orange-500 focus:ring-blue-300  text-white font-bold py-2 px-4 rounded"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
}

export default Search;
