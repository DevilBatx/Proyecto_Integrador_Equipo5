import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import { useParams, useNavigate } from 'react-router-dom';

const SearchList = () => {
  const { state, apiURL, dispatch } = useContext(GlobalContext);
  const params = useParams();
  const navigate = useNavigate();

  const getProductList = async () => {
    try {
      const response = await fetch(`${apiURL}/public/search`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: "SET_SEARCH_RESULTS", payload: data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getProductList();
  }, [params.query, apiURL, dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className='p-20 mt-20 '>
        <div className='flex flex-1 justify-between'>
          <h1 className='text-left text-xl text-orange-500 font-bold py-5'>{state.data.name}</h1>
          <button onClick={goBack} className='mr-25 text-xs font-semibold uppercase transition ease-in-out hover:text-sky-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 text-gray-700 hover:text-orange-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchList;





