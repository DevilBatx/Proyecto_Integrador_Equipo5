import React from 'react'
import { useParams } from 'react-router-dom';
import PaginationButtons from '../Components/PaginationButtons';
import { useContext,useEffect, useState } from "react";
import { GlobalContext } from "../Components/Utils/GlobalContext";
import { getCategoryById } from '../api/CategoryApi'; 


//TODO - Implementar el componente Products para las categorias
const Products = () => {
  const { apiURL } = useContext(GlobalContext);
  const param = useParams()
const [category, setCategory] = useState("")

//Lllamo a funcion getCategoryById
useEffect(() => {
  const fetchData = async () => {
    try {
      const categoryData = await getCategoryById(apiURL, param.id);
      setCategory(categoryData);
    } catch (error) {
      // Manejar errores aquí si es necesario
      console.error('Error fetching category:', error);
    }
  };

  fetchData();
}, []);

  return (
    <div className='text-center mr-10 ml-10'>
      <h1 className='text-2xl text-center my-8 mt-40 font-bold'>{ `${category.name}`}</h1>
      <PaginationButtons endPoint = {`${apiURL}/public/products/category/${param.id}`} />
    </div>
  )
}

export default Products