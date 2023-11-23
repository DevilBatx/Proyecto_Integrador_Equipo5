import React, { useState, useRef, useContext } from 'react';
import { GlobalContext } from "./Utils/GlobalContext";
import Suggestions from './Suggestions';

const Search = () => {
  const { apiURL } = useContext(GlobalContext);
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
        `${apiURL}/public/searchproducts?search=${value}`,
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
    <form>
      <input placeholder='Buscar intrumentos, accesorios...' onChange={handleInputChange} />
      {isLoading && <div>Cargando productos...</div>}
      {!isLoading && <Suggestions results={results} />}
    </form>
  );
};

export default Search;