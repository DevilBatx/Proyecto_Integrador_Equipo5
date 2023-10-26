import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../Components/Utils/GlobalContext';

const ListAllProductsPage = () => {
    const { dataApi, state } = useContext(GlobalContext);

    useEffect(() => {
                const productsApiUrl = 'http://localhost:8080/api/v1/products';
        dataApi(productsApiUrl);
    }, [dataApi]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Lista de Productos</h1>
            <table className="w-full bg-white rounded shadow-md">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Nombre</th>
                        <th className="border p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {state.data.map(product => (
                        <tr key={product.id}>
                            <td className="border p-2">{product.id}</td>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2"> 
                                {/* Agregar acciones */}
                                ...
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListAllProductsPage;