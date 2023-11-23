import React, { useState, useRef } from 'react';
import Suggestions from './Suggestions';

const Search = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const latestRequest = useRef(0);
  const inputRef = useRef(""); // Ref to keep track of the current input value

  const handleInputChange = async ({ target: { value } }) => {
    inputRef.current = value; // Update the current input value
    if (!value.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const currentRequest = ++latestRequest.current;

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/public/products?search=${value}`,
      );

      // Check if this is still the latest request and if the input hasn't been cleared
      if (currentRequest !== latestRequest.current || !inputRef.current.trim()) {
        return;
      }

      if (!response.ok) {
        console.error('Error fetching suggestions:', response.status);
        return;
      }

      const data = await response.json();
      const dataResponse = data?.data || data;

      setResults(dataResponse);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      // Only stop loading if this is the latest request
      if (currentRequest === latestRequest.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 ps-8 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
      <input placeholder='Buscar intrumentos, accesorios...' onChange={handleInputChange} className='w-full' />
      {isLoading && <div>Cargando productos...</div>}
      {!isLoading && <Suggestions results={results} />}
    </form>
  );
};

export default Search;