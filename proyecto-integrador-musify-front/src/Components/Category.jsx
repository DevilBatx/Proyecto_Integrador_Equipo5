import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryList } from '../api/CategoryApi';
import { GlobalContext } from '../Components/Utils/GlobalContext';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const { apiURL } = useContext(GlobalContext);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const categoryList = await getCategoryList(apiURL);
        setCategories(categoryList);
    };

    return (
        <div className="flex items-center justify-center min-h-screen container mx-auto">
            {/*grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mr-10 ml-10'>
                {/*card1*/}
                {categories.map((category) => (
                    <div key={category.id} className='card'>
                        <div className='p-5 flex flex-col'>
                            <div className='h-2/3 rounded-xl overflow-hidden'>
                                <Link to={`/categories/${category.id}`}>
                                    <img className="w-29" src={category.url} alt="Category image" />
                                </Link>
                            </div>
                            <h5 className="  text-center text-2xl  font-medium mt-3">{category.name}</h5>
                            <Link to={`/categories/${category.id}`} className='text-white mt-5 bg-gradient-to-b from-[#D97236] via-[#D97236] to-[#F2A649] hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-100 dark:hover:text-orange-500 dark:focus:ring-blue-800 '>
                                Explorar Categoria
                            </Link>
                        </div>
                        <h5 className="text-2xl  text-center md:text-3xl font-medium mt-3">Accesorios</h5>
                        <a href="#" className=' text-white mt-5 bg-gradient-to-b from-[#D97236] via-[#D97236] to-[#F2A649] hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-100 dark:hover:text-orange-500 dark:focus:ring-blue-800'>Explorar Categoria</a>
                    </div>
                </div>
                {/*card3*/}
                <div className='card'>
                    <div className='p-5 flex flex-col'>
                        <div className='rounded-xl overflow-hidden'>
                            <Link to="/guitarras">
                                <img className=" w-29" src={Piano} alt="product image" />
                            </Link>
                        </div>
                        <h5 className="text-2xl  text-center md:text-3xl font-medium mt-3">Teclados</h5>
                        <a href="#" className='text-white mt-5 bg-gradient-to-b from-[#D97236] via-[#D97236] to-[#F2A649] hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-100 dark:hover:text-orange-500 dark:focus:ring-blue-800 '>Explorar Categoria</a>
                    </div>
                </div>
                {/*card4*/}
                <div className='card'>
                    <div className='p-5 flex flex-col'>
                        <div className='rounded-xl overflow-hidden'>
                            <Link to="/guitarras">
                                <img className=" w-29" src={bateria2} alt="product image" />
                            </Link>
                        </div>
                        <h5 className="text-2xl  text-center md:text-3xl font-medium mt-3">Percusion</h5>
                        <a href="#" className=' text-white mt-5 bg-gradient-to-b from-[#D97236] via-[#D97236] to-[#F2A649] hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-100 dark:hover:text-orange-500 dark:focus:ring-blue-800'>Explorar Categoria</a>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Category;
