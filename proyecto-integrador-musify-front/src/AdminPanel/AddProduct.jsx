import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();

const handleListProducts = () => {
    navigate("/agregarproducto");
};

    return (
        <button className="bg-orange-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleListProducts}>
        Agregar Producto
        </button>
    );
};

export default AddProduct;