import React, { useState } from 'react';

function AgregarProducto({ onAdd }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);

    const handleImageChange = (event) => {
        setImages([...images, ...event.target.files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onAdd({ name, description, images });

        setName('');
        setDescription('');
        setImages([]);
    };

    return (
        <div className="p-16 mt-14 mb-10 bg-gray-100 rounded-xl shadow-md">
            
            <h2 className="text-2xl mb-6 font-bold text-center">Agregar Producto</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg md:w-2/3 mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-600">Nombre del Producto</label>
                        <input 
                            id="productName"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Nombre"
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-600">Descripción</label>
                        <textarea 
                            id="productDescription"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Descripcion"
                            className="mt-1 p-2 w-full border rounded h-24"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productImages" className="block text-sm font-medium text-gray-600">Imágenes</label>
                        <input 
                            id="productImages"
                            type="file" 
                            multiple 
                            onChange={handleImageChange} 
                            className="mt-1 mb-2"
                        />
                    </div>
                    <button type="submit" className="bg-orange-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Agregar</button>
                </form>
            </div>
        </div>
    );
}

export default AgregarProducto;