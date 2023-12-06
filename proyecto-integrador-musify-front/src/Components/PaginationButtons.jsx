import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "./Utils/GlobalContext";
import Card from "./Card";

const PaginationButtons = (props) => {
  const { apiURL } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [data, setData] = useState([]); // Para almacenar los datos obtenidos de la solicitud
  const itemsPerPage = 10; // Ajusta según tu necesidad

  useEffect(() => {
    // Función para realizar la solicitud FETCH
    const fetchData = async () => {
      try {
        const response = await fetch(
          props.endPoint
        );
        const result = await response.json();
        setTotalPages(Math.ceil(result.length / itemsPerPage));
        let resultPag = []
        for (let i = 0; i < result.length; i += itemsPerPage) {
          const item = result.slice(i, i + itemsPerPage);
          resultPag.push(item);
        }
        setData(resultPag);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Llamada a la función FETCH al cargar la página o al cambiar la página
    fetchData();
  }, []);

  const visiblePages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i >= currentPage - 1 && i <= currentPage + 1) {
      visiblePages.push(i);
    }
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Array.isArray(data[currentPage - 1]) &&
        data[currentPage - 1].map((product) => (
          <Card key={product.id} data={product} />
        ))}
    </div>
    <div className="container mx-auto flex content-baseline items-baseline justify-center gap-6 rounded-lg p-8 drop-shadow-md lg:flex-row lg:gap-2 lg:py-10 xl:gap-6">
      {currentPage > 1 && (
        <button
          onClick={handlePrevClick}
          className="p-3 border-orange-600 px-4 rounded-full hover:bg-orange-200 hover:text-white"
        >
          <h3 className="text-sm font-medium">Anterior</h3>
        </button>
      )}

      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
          className={`rounded-full border-orange-500 p-3 font-semibold text-black transition ease-in-out ${
            currentPage === pageNumber ? "bg-orange-500 text-white" : ""
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={handleNextClick}
          className="p-3 border-orange-600 px-4 rounded-full hover:bg-orange-200 hover:text-white"
        >
          <h3 className="text-sm font-medium">Siguiente</h3>
        </button>
      )}
      </div>
    </div>
  );
};

export default PaginationButtons;
