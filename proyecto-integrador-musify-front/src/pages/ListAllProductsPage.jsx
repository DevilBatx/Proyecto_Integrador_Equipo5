import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../Components/Utils/GlobalContext';

const ListAllProductsPage = () => {
    const { dataApi, state, apiURL } = useContext(GlobalContext);

    useEffect(() => {
        const productsApiUrl = (`${apiURL}/public/products`);
        dataApi(productsApiUrl);
    }, []);

    const handleDelete = async (productId) => {

        const authToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuMkBnbWFpbC5jb20iLCJpYXQiOjE2OTk1MTM0MDYsImV4cCI6MTY5OTUxNTIwNn0.v1Mg9yYGsF0ROWGgFFZ2ZVTPlHqhiMerX7-C790vdxo";
        
        if (window.confirm('¿Eliminar producto?')) {
            try {
                const response = await fetch(`${apiURL}/public/products`, {
                    method: 'DELETE',
                    headers: {'Authorization': `Bearer ${authToken}`}          
                    
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Si funciona, se filtra el producto ddel estado 
                const updatedProducts = state.data.filter(product => product.id !== productId);
                setState({ ...state, data: updatedProducts });
                
            } catch (error) {
                console.error('Hubo un error al intentar eliminar el producto:', error);
                
            }
        }
    };

    const handleEdit = (productId) => {
        // Insertar pagina donde se edita el producto        
        
        // history.push(`/edit-product/${productId}`);
    };

    return (
        <div className="p-14 mt-14 mb-10 bg-gray-100 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Lista de Productos</h1>
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th className="border p-3">ID</th>
                        <th className="border p-3">Nombre</th>
                        <th className="border p-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {state.data.map((product, index) => (
                        <tr key={product.id} className={index % 2 ? 'bg-gray-100' : ''}>
                            <td className="border p-3">{product.id}</td>
                            <td className="border p-3">{product.name}</td>
                            <td className="border p-3 flex justify-start space-x-2"> 
                                {/* Edit button */}
                                <button
                                    onClick={() => handleEdit(product.id)}
                                    className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Editar
                                </button>

                                {/* Delete button */}
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListAllProductsPage;