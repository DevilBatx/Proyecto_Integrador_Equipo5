import React, { useState,useContext } from "react";
import { GlobalContext } from "../Components/Utils/GlobalContext";

function AgregarProducto({ onAdd }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");  


    const { apiURL } = useContext(GlobalContext)      



    const handleImageChange = (event) => {
        setImages([...images, ...event.target.files]);
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setSuccessMessage('');
        setErrorMessage('');

        const formData = new FormData();
        formData.append('productInfo', new Blob([JSON.stringify({ name, description })], { type: 'application/json' }));
        images.forEach((image) => {
            formData.append('files', image);
        });       

        const authToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuMkBnbWFpbC5jb20iLCJpYXQiOjE2OTk1MTI4OTIsImV4cCI6MTY5OTUxNDY5Mn0.8zFgiqJ2zTvCT_k_CskFjHSLBG5h-DJECOkbm3qZqJw";
        
        try {
            const response = await fetch((`${apiURL}/auth/products`),{
            method: 'POST',
            body: formData,
            headers: {'Authorization': `Bearer ${authToken}`}            
            }                               
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);

            
            setSuccessMessage("Producto agregado con éxito!");
            onAdd(result); 

        setName('');
        setDescription('');
        setCategory('');
        setImages([]);

            
        } catch (error) {
            console.error('Error al agregar el producto. Por favor, intente de nuevo:', error);
            
            setErrorMessage("Error al agregar el producto. Por favor, intente de nuevo.");
        }
    };

    return (
        <div className="p-16 mt-14 mb-10 bg-gray-100 rounded-xl shadow-md">
            <h2 className="text-2xl mb-6 font-bold text-center">Agregar Producto</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg md:w-2/3 mx-auto">
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                        <label
                            htmlFor="productName"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Nombre del Producto
                        </label>
                        <input
                            id="productName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre"
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="productDescription"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Descripción
                        </label>
                        <textarea
                            id="productDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descripcion"
                            className="mt-1 p-2 w-full border rounded h-24"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="productCategory"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Categoría
                        </label>
                        <input
                            id="categoryName"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Categoría"
                            className="mt-1 p- w-full border rounded"
                        ></input>
                    </div>
                    
                    <div className="mb-4">
                        <label
                            htmlFor="productImages"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Imágenes
                        </label>
                        <input
                            id="productImages"
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="productImages"
                            className="bg-orange-500 hover:bg-gray-700 text-white font-bold text-sm py-1 px-2 rounded hover:cursor-pointer "
                        >
                            Agregar Imagen
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-gray-700 text-white font-bold text-sm py-2 px-4 rounded"
                        >
                            Agregar Producto
                        </button>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mt-4 text-sm font-medium text-green-600">
                            {successMessage}
                        </div>
                    )}

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mt-4 text-sm font-medium text-red-600">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AgregarProducto;
