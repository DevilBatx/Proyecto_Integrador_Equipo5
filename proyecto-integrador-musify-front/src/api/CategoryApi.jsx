// CategoryApi.jsx

import { GlobalContext } from '../Components/Utils/GlobalContext'; 
import { useContext } from 'react';


// Función para obtener una categoría por id
export const getCategoryById = async (apiURL, categoryId) => {
    //const { apiURL } = useApiContext();
    try {
        const response = await fetch(`${apiURL}/public/categories/${categoryId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la categoría por id:', error);
        throw error;
    }
};

// Función para obtener la lista de categorías
export const getCategoryList = async (apiURL) => {
    // const { apiURL } = useApiContext();
    try {
        const response = await fetch(`${apiURL}/public/categories`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la lista de categorías:', error);
        throw error;
    }
};


export const createCategory = async (apiURL, categoryData) => {
    try {
        const response = await fetch(`${apiURL}/auth/categories`, {
            method: 'POST',
            body: categoryData,
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        throw error;
    }
};

// Función para actualizar una categoría
export const updateCategory = async (apiURL, categoryData) => {
    //const { apiURL } = useApiContext();
    try {
        const response = await fetch(`${apiURL}/auth/categories`, {
            method: 'PUT',
            body: categoryData,
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        throw error;
    }
};

// Función para eliminar una categoría
export const deleteCategory = async (apiURL, categoryId) => {
    try {
        const response = await fetch(`${apiURL}/auth/categories/${categoryId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            let errorMessage;

            if (response.status === 409) {
                // Error 409: Conflicto (por ejemplo, productos asociados)
                errorMessage = 'No es posible eliminar la categoría porque tiene productos asociados.';
            } else {
                // Otros errores
                errorMessage = 'No se pudo eliminar la categoría.';
            }

            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        throw error;
    }
};
