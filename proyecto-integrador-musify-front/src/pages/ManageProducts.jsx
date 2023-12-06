import React, { useState, useEffect, useContext } from 'react';
import { getProductList, updateProduct, deleteProduct, getCategories } from '../api/ProductApi';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import { useNavigate } from 'react-router-dom';


function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [productName, setProductName] = useState("");
  const { apiURL, state, dispatch } = useContext(GlobalContext);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState({ imageError: "", productNameError: "", productDeleteError: "" })
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const goBack = () => {
    window.history.back();
  };


  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const productList = await getProductList(apiURL);
    setProducts(productList);
  };

  const loadCategories = async () => {
    const fetchedCategories = await getCategories(apiURL);
    setCategories(fetchedCategories);
  };

  const handleAddProduct = () => {
    navigate("/agregarproducto");
  };

  const handleUpdateProduct = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
try {
    const productInfo = {
      id: selectedProduct.id,
      name: productName,
      category: selectedCategory,
    };

    const productData = new FormData();
    productData.append(
      'productInfo',
      new Blob([JSON.stringify(productInfo)], {
        type: 'application/json',
      })
    );

    if (images) {
      productData.append("NewFiles", images);
    }

    await updateProduct(apiURL, productData);

    loadProducts();
  } catch (error) {
    console.error('Error al manejar la actualización del producto:', error);
    setErrorMessage({ ...errorMessage, productUpdateError: error.message })
    
    }
    setSelectedProduct(null);
    setProductName("");
    setImages(null);
    setShowModal(false);
    setTitulo("");
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const handleDeleteProduct = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await deleteProduct(apiURL, selectedProduct.id);
      setSelectedProduct(null);
      setProductName("");
      setShowModalDelete(false);
      setTitulo("");
      loadProducts();
    } catch (error) {
      console.error('Error al manejar la eliminación del producto:', error);
      setErrorMessage({ ...errorMessage, productDeleteError: error.message })
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setTitulo("Editar Producto");
    setShowModal(true);
    setErrorMessage({ imageError: "", productNameError: "" })
    setProductName(product.name);
    setSelectedCategory(product.category);
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setProductName(product.name);
    setTitulo("Eliminar Producto");
    setShowModalDelete(true);
    setErrorMessage({ ...errorMessage, productDeleteError: "" })
  };
  const handleProductName = (event) => {
    setProductName(event.target.value);
    setErrorMessage({ ...errorMessage, productNameError: "" })
  };
  const handleImageChange = (event) => {
    setImages([ ...event.target.files]);
    setErrorMessage({ ...errorMessage, imageError: "" })
  };


  return (
    <div className="p-14 mt-14 mb-10 mx-16 bg-gray-100 rounded-xl shadow-md" >
      <div className ='flex flex-1 justify-end' >
      <button onClick={goBack}
            className='mr-25 text-xs font-semibold uppercase transition ease-in-out hover:text-sky-500 mx-14 my-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 text-gray-700 hover:text-orange-500 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
          </button>
      </div>
      <div className=" flex justify-between mb-6">
        <h1 className="text-2xl font-bold mb-6">Administrar Productos</h1>
        <button
          className="text-white mt-5 border-solid border-2 border-orange-500 bg-orange-500 hover:bg-gray-100  font-medium rounded-lg text-sm px-4 py-2.5 text-center hover:bg-gray-100 hover:text-orange-500 self-end"
          onClick={handleAddProduct}>Agregar Producto
        </button>
      </div>
      <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="border p-3 ">ID</th>
            <th className="border p-3">Nombre</th>
            <th className="border p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className={index % 2 ? 'bg-gray-100' : ''}>
              <td className='text-center border p-3'>{product.id}</td>
              <td className="border p-3">{product.name}</td>
              <td className='border p-3 items-center space-x-2'>
                <button
                  className="bg-gray-800 hover:bg-gray-100 text-white hover:text-gray-800 font-bold py-1 px-2 rounded shadow-md"
                  onClick={() => handleEditClick(product)}>Editar</button>
                <button
                  className="bg-orange-500 hover:bg-gray-100 text-white hover:text-orange-500 font-bold py-1 px-2 rounded shadow-md"
                  disabled={state.loading}
                  onClick={() => handleDeleteClick(product)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {showModal && (
        <div className=" flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-90">
          <div className="bg-white rounded-lg w-1/2">
            <form className="w-full">
              <div className="flex flex-col items-start p-4">
                <div className='flex items-center w-full border-b pb-4'>
                  <h2 className="text-gray-900 font-medium text-lg">{titulo}</h2>
                  <button
                    className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer "
                    onClick={() => setShowModal(false)}
                  >
                    <span>✖</span>
                  </button>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="productName"
                    className="block font-medium text-sm text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    id="productName"
                    className='mt-2 text-sm pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                    type="text"
                    value={productName}
                    onChange={(e) => handleProductName(e)}
                  />
                </div>
                <div className="py-4 border-b w-full mb-4">
                  <label
                    htmlFor="productImage"
                    className="block font-medium text-sm text-gray-700"
                  >
                    Imágen
                  </label>
                  <input
                    id="productImage"
                    className='mt-2 text-sm pl-2 pr-4 rounded-lg py-2'
                    type="file"
                    onChange={handleImageChange}
                    multiple
                  />
                </div>
                <div>
                  <label
                    htmlFor="productCategory"
                    className="block font-medium text-sm text-gray-700"
                  >
                    Categoría
                  </label>
                  <select
                    id="productCategory"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mt-1 p-2 w-full border rounded"
                  >
                    <option value="">Seleccionar Categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className='text-sm font-semibold text-red-700'>{errorMessage.productNameError}</div>
                <div className=' text-sm font-semibold text-red-700'>{errorMessage.imageError}</div>
                <div className='ml-auto'>
                  <button
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={titulo === "Editar Producto" ? handleUpdateProduct : handleAddProduct}>{state.loading ? 'Cargando...' : 'Confirmar'}</button>
                  <button
                    className="bg-gray-500 text-white font-bold py-2 px-4  ml-2 rounded"
                    type="button"
                    disabled={state.loading}
                    onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )
      }
      {showModalDelete && (
        <div className=" flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-90">
          <div className="bg-white rounded-lg w-1/2">
            <form className="w-full">
              <div className="flex flex-col items-start p-4">
                <div className='flex items-center w-full border-b pb-4'>
                  <h2 className="text-gray-900 font-medium text-lg">Eliminar Producto</h2>
                  <button
                    className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer "
                    onClick={() => setShowModalDelete(false)}
                  >
                    <span>✖</span>
                  </button>
                </div>
                <div className="w-full py-10">
                  <div>
                    ¿Está seguro que desea eliminar el producto <span className='font-bold'>{productName}</span>?
                  </div>
                </div>
                <div className='text-sm font-semibold text-red-700 pb-2'>{errorMessage.productDeleteError}</div>
                <div className='ml-auto'>
                  <button
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={handleDeleteProduct} >{state.loading ? 'Cargando...' : 'Confirmar'}</button>
                  <button
                    className="bg-gray-500 text-white font-bold py-2 px-4  ml-2 rounded"
                    type="button"
                    disabled={state.loading}
                    onClick={() => setShowModalDelete(false)}>Cancelar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )
      }



    </div >
  );
}

export default ManageProducts;
