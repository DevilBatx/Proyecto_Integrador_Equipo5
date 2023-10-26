import React from 'react'
import { Link } from 'react-router-dom'
import Guitarraelec from '../assets/Products/GuitarraElectrica.png'
import Piano from '../assets/Products/Piano.png'

const Category = () => {
    return (
        <div className="w-full max-w-sm bg-white flex flex-col items-center gap-1 p-1">
            <Link to="/guitarras">
                <img className="w-full h-auto max-h-30 max-w-full  py-2.5" src={Guitarraelec} alt="product image" />
            </Link>
            <div className="px-5 pb-5">
                <Link to="/products">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Guitarras</h5>
                </Link>
                <div className="flex items-center justify-between">
                    <Link to="/guitarras" className="text-white bg-orange-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-gray-700 dark:hover:bg-orange-500 dark:focus:ring-blue-800">
                    Ver más
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Category;