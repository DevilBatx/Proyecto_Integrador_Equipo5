import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Search from './Search';
import Calendar from './Calendar';
import { GlobalContext } from './Utils/GlobalContext';

const SearchWithCalendar = () => {
  const [search, setSearch] = useState({ query: '', startDate: null, endDate: null });
  const { apiURL, dispatch } = useContext(GlobalContext);
  const history = useHistory();

  const handleSearch = (query) => {
    setSearch({ ...search, query });
  };

  const handleSearchButton = () => {
    const { query, startDate, endDate } = search;
    const url = `/searchlist?query=${query}&startDate=${startDate}&endDate=${endDate}`;
    // Navegar a la nueva URL
    history.push(url);
  };

  return (
    <div className="w-full h-[60vh] bg-cover">
      <div className="flex items-center justify-between pt-[17%] px-[10%]">
        <Search onSearch={handleSearch} />
        <Calendar />
        <button onClick={handleSearchButton} className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded-full shadow text-sm md:text-base ml-4">
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchWithCalendar;




