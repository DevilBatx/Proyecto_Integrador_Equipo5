import React, { useState } from 'react';
import AddProduct from './AddProduct';

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    if (products.find(p => p.name === product.name)) {
      alert('Product name already taken. Please choose a different one.');
      return;
    }
    setProducts([...products, product]);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <AddProduct onAdd={addProduct} />
    </div>
  );
}

export default App;
