import React, { useState, useEffect, useContext } from 'react';
import { getCategoryList, createCategory, updateCategory, deleteCategory } from '../api/CategoryApi';
import { GlobalContext } from '../Components/Utils/GlobalContext';

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const { apiURL, state, dispatch } = useContext(GlobalContext);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState({ imageError: "", categoryNameError: "", categoryDeleteError: "" })
  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const categoryList = await getCategoryList(apiURL);
    setCategories(categoryList);
  };

  const handleCreateCategory = async () => {
    const errors = {};

    if (!image || image.length === 0) {
      errors.imageError = '⚠︎ Atencion! Debe seleccionar una imagen';
    }

    if (!categoryName) {
      errors.categoryNameError = '⚠︎ Atencion! Debe ingresar un nombre';
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }
    dispatch({ type: 'SET_LOADING', payload: true });
    const categoryData = new FormData();
    categoryData.set(
      'categoryInfo',
      new Blob([JSON.stringify({ name: categoryName })], {
        type: 'application/json',
      })
    );

    categoryData.set("files", image);

    await createCategory(apiURL, categoryData);
    setImage(null);
    setShowModal(false);
    setTitulo("");
    loadCategories();
    dispatch({ type: 'SET_LOADING', payload: false });

  };

  const handleUpdateCategory = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const categoryData = new FormData();
    categoryData.set(
      'categoryInfo',
      new Blob([JSON.stringify({ id: selectedCategory.id, name: categoryName })], {
        type: 'application/json',
      })
    );

    categoryData.set("newFile", image);

    await updateCategory(apiURL, categoryData);
    setSelectedCategory(null);
    setCategoryName("");
    setImage(null);
    setShowModal(false);
    setTitulo("");
    loadCategories();
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const handleDeleteCategory = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await deleteCategory(apiURL, selectedCategory.id);
      setSelectedCategory(null);
      setCategoryName("");
      setShowModalDelete(false);
      setTitulo("");
      loadCategories();
    } catch (error) {
      console.error('Error al manejar la eliminación de la categoría:', error);
      setErrorMessage({ ...errorMessage, categoryDeleteError: error.message })
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setTitulo("Editar Categoría");
    setShowModal(true);
    setErrorMessage({ imageError: "", categoryNameError: "" })
    setCategoryName(category.name);
  };

  const handleCreateClick = () => {
    setTitulo("Crear Categoría");
    setCategoryName("");
    setShowModal(true);
    setErrorMessage({ imageError: "", categoryNameError: "" })
  };
  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setTitulo("Eliminar Categoría");
    setShowModalDelete(true);
    setErrorMessage({ ...errorMessage, categoryDeleteError: "" })
  };
  const handleCategoryName = (event) => {
    setCategoryName(event.target.value);
    setErrorMessage({ ...errorMessage, categoryNameError: "" })
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setErrorMessage({ ...errorMessage, imageError: "" })
  };


  return (
    <div className="p-14 mt-14 mb-10 mx-16 bg-gray-100 rounded-xl shadow-md h-screen" >
      <div className='flex flex-1 justify-end' >
        <button onClick={goBack}
          className='mr-25 text-xs font-semibold uppercase transition ease-in-out hover:text-sky-500 mx-14 my-5'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 text-gray-700 hover:text-orange-500 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
        </button>
      </div>
      <div className=" flex justify-between mb-6">
        <h1 className="text-2xl font-bold mb-6">Administrar Categorías</h1>
        <button
          className="text-white mt-5 border-solid border-2 border-orange-500 bg-orange-500 hover:bg-gray-100  font-medium rounded-lg text-sm px-4 py-2.5 text-center hover:text-orange-500 self-end"
          onClick={handleCreateClick}>Nueva Categoría
        </button>
      </div>
      <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="border p-3 ">ID</th>
            <th className="border p-3">Nombre</th>
            <th className="border p-3">Imagen</th>
            <th className="border p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id} className={index % 2 ? 'bg-gray-100' : ''}>
              <td className='text-center border p-3'>{category.id}</td>
              <td className="border p-3">{category.name}</td>
              <td className='border p-3 flex justify-center text-center'>
                <img src={category.url} alt="imagen de categoria" className='h-10' />
              </td>
              <td className='border p-3 items-center space-x-2'>
                <button
                  className="bg-gray-800 hover:bg-gray-100 text-white hover:text-gray-800 font-bold py-1 px-2 rounded shadow-md"
                  onClick={() => handleEditClick(category)}>Editar</button>
                <button
                  className="bg-orange-500 hover:bg-gray-100 text-white hover:text-orange-500 font-bold py-1 px-2 rounded shadow-md"
                  disabled={state.loading}
                  onClick={() => handleDeleteClick(category)}>Eliminar</button>
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
                    htmlFor="categoryName"
                    className="block font-medium text-sm text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    id="categoryName"
                    className='mt-2 text-sm pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                    type="text"
                    value={categoryName}
                    onChange={(e) => handleCategoryName(e)}
                  />
                </div>
                <div className='text-sm font-semibold text-red-700'>{errorMessage.categoryNameError}</div>
                <div className="py-4 border-b w-full mb-4">
                  <label
                    htmlFor="categoryImage"
                    className="block font-medium text-sm text-gray-700"
                  >
                    Imágen
                  </label>
                  <input
                    id="categoryImage"
                    className='mt-2 text-sm pl-2 pr-4 rounded-lg py-2'
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
                <div className=' text-sm font-semibold text-red-700'>{errorMessage.imageError}</div>
                <div className='ml-auto'>
                  <button
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={titulo === "Editar Categoría" ? handleUpdateCategory : handleCreateCategory}>{state.loading ? 'Cargando...' : 'Confirmar'}</button>
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
                  <h2 className="text-gray-900 font-medium text-lg">Eliminar Categoría</h2>
                  <button
                    className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer "
                    onClick={() => setShowModalDelete(false)}
                  >
                    <span>✖</span>
                  </button>
                </div>
                <div className="w-full py-10">
                  <div>
                    <div className=' border p-2 bg-gray-50'>
                      <span className=' font-semibold '>Atencion! <br /></span>
                      Antes de eliminar una categoria debe verificar que no hay productos asociados a ella. <br /><br />
                    </div>
                    ¿Está seguro que desea eliminar la categoría <span className='font-bold'>{categoryName}</span>?
                  </div>
                </div>
                <div className='text-sm font-semibold text-red-700 pb-2'>{errorMessage.categoryDeleteError}</div>
                <div className='ml-auto'>
                  <button
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={handleDeleteCategory} >{state.loading ? 'Cargando...' : 'Confirmar'}</button>
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

export default ManageCategories;
