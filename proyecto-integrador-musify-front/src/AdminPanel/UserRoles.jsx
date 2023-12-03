import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserRoles = () => {

    const navigate = useNavigate();

    const handleListProducts = () => {
        navigate("/allusers");
    };
    return (
        <button className="bg-orange-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleListProducts}>
            Roles de Usuario
        </button>
    );
};

export default UserRoles;
