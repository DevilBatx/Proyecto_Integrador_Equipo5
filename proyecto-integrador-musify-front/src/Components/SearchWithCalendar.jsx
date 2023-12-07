import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import Calendar from './Calendar';
import { formatDate } from './Utils/helpers';


const SearchWithCalendar = () => {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const handleSearchButton = () => {
    navigate(`/searchlist?query=${encodeURIComponent(query)}&startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`);
  };

  return (
    <div className="w-full h-[60vh] bg-cover">
      <div className="flex items-center justify-between pt-[17%] px-[10%]">
        <Search onHandleChange={setQuery} />
        <Calendar onSetStartDate={setStartDate} onSetEndDate={setEndDate}/>
        <button disabled={!query||!startDate||!endDate} onClick={handleSearchButton} className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded-full shadow text-sm md:text-base ml-4">
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchWithCalendar;








