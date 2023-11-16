import React from 'react';
import { Link } from 'react-router-dom';
import Guitarraelec from '../assets/Products/GuitarraElectrica.png';
import DJ from '../assets/Products/DJ.webp';
import Piano from '../assets/Products/Piano.png'
import bateria2 from '../assets/Products/bateria2.jpg'

const Category = () => {
    return (
        <div className="flex items-center justify-center min-h-screen container mx-auto">
            {/*grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                {/*card1*/}
                <div className='card'>
                    <div className='p-5 flex flex-col'>
                        <div className='rounded-xl overflow-hidden'>
                            <Link to="/guitarras">
                                <img className=" h-auto max-h-30 max-w-full w-full py-2.5" src={Guitarraelec} alt="product image" />
                            </Link>
                        </div>
                        <h5 className="text-2xl  text-center md:text-3xl font-medium mt-3">Guitarras</h5>
                        <a href="#" className='text-center bg-orange-400 text-black py-2 rounded-lg
                            font-semibold mt-4 hover:bg-orange-300 focus:scale-95 transition-all
                            duration-200 ease-out '>Explorar Categoria</a>
                    </div>
                </div>
                {/*card2*/}
                <div className='card'>
                    <div className='p-5 flex flex-col'>
                        <div className='rounded-xl overflow-hidden'>
                            <Link to="/guitarras">
                                <img className=" h-auto max-h-30 max-w-full w-full py-2.5" src={DJ} alt="product image" />
                            </Link>
                        </div>
                        <h5 className="text-2xl  text-center md:text-3xl font-medium mt-3">Accesorios</h5>
                        <a href="#" className='text-center bg-orange-400 text-black py-2 rounded-lg
                            font-semibold mt-4 hover:bg-orange-300 focus:scale-95 transition-all
                            duration-200 ease-out '>Explorar Categoria</a>
                    </div>
                </div>
                {/*card3*/}
                <div className='card'>
                    <div className='p-5 flex flex-col'>
                        <div className='rounded-xl overflow-hidden'>
                            <Link to="/guitarras">
                                <img className=" h-auto max-h-30 max-w-full w-full py-2.5" src={Piano} alt="product image" />
                            </Link>
                        </div>
                        <h5 className="text-2xl  text-center md:text-3xl font-medium mt-3">Teclados</h5>
                        <a href="#" className='text-center bg-orange-400 text-black py-2 rounded-lg
                            font-semibold mt-4 hover:bg-orange-300 focus:scale-95 transition-all
                            duration-200 ease-out '>Explorar Categoria</a>
                    </div>
                </div>
                {/*card4*/}
                <div className='card'>
                    <div className='p-5 flex flex-col'>
                        <div className='rounded-xl overflow-hidden'>
                            <Link to="/guitarras">
                                <img className=" h-auto max-h-30 max-w-full w-full py-2.5" src={bateria2} alt="product image" />
                            </Link>
                        </div>
                        <h5 className="text-2xl  text-center md:text-3xl font-medium mt-3">Percusion</h5>
                        <a href="#" className='text-center bg-orange-400 text-black py-2 rounded-lg
                            font-semibold mt-4 hover:bg-orange-300 focus:scale-95 transition-all
                            duration-200 ease-out '>Explorar Categoria</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
