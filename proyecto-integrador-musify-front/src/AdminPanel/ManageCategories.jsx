import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManageCategories = () => {

    const navigate = useNavigate();

const handleCategories = () => {
    navigate("/adminCategories");
}

    return (
        <button className="bg-orange-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleCategories}>
            Administracion de Categorias
        </button>
    );
};

export default ManageCategories;
