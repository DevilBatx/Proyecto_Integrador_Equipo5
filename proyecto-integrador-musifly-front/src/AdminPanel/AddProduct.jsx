import React, { useState } from 'react';

function AddProduct({ onAdd }) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleSubmit = () => {
    onAdd({ name, description, images });
    setIsAdding(false);
    setName('');
    setDescription('');
    setImages([]);
  };

  if (!isAdding) {
    return <button onClick={() => setIsAdding(true)} className="bg-orange-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Agregar Producto</button>;
  }

  return (
    <div className="mt-4 p-6 border bg-white rounded shadow-lg w-full md:w-1/2">
      <input 
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nombre"
        className="p-2 border rounded w-full mb-2"
      />
      <textarea 
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descripcion"
        className="p-2 border rounded w-full mb-2 h-24"
      />
      <input type="file" multiple onChange={handleImageChange} className="mb-2" />
      <button onClick={handleSubmit} className="bg-orange-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Agregar</button>
    </div>
  );
}

export default AddProduct;
