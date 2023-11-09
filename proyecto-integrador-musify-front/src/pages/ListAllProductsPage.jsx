import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../Components/Utils/GlobalContext';

const ListAllProductsPage = () => {
    const { dataApi, state } = useContext(GlobalContext);

    useEffect(() => {
        const productsApiUrl = 'http://54.210.150.116:8080/api/v1/products';
        dataApi(productsApiUrl);
    }, [dataApi]);

    const handleDelete = (productId) => {
        // Add logic to delete product by productId
        console.log('Delete product with id:', productId);
    };

    const handleEdit = (productId) => {
        // Add logic to edit product by productId
        console.log('Edit product with id:', productId);
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
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
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
