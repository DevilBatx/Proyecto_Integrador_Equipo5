import React from 'react';
import Search from '../Components/Search';
import Card from '../Components/Card';
import Category from '../Components/Category';
import fondo2 from '../assets/fondo2.jpg';
import Calendar from '../Components/Calendar';
import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import PaginationButtons from '../Components/PaginationButtons';

const Home = () => {

    const { state, dataApi, apiURL } = useContext(GlobalContext)


    const handleSearch = (term) => {
        // Implementa la lógica de búsqueda de productos aquí
        console.log(`Se buscará el producto con el término: ${term}`);
    }

    const getProductRandom = async () => {
        await dataApi(`${apiURL}/public/products/random?numberOfProducts=10`);
    }

    useEffect(() => {
        getProductRandom();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <div className='bg-cover'>
                <img className='w-full h-full object-cover' src={fondo2} alt="fondoHome" />
            </div>

            <Search />

            <Calendar />

            <section className="mb-8 flex gap-5 items-center justify-center pb-2">
                <div className="text-center">
                    <h2 className="text-3xl text-orange-500 font-bold md:h-full">Categorias</h2>
                    <div>
                        <Category />
                    </div>
                </div>
            </section>
            <section className="mb-8 flex gap-5 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl text-orange-500 font-bold mb-4 p-10">Recomendados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {Array.isArray(state.data) && state.data.map((product) => (
                            <Card key={product.id} data={product} />
                        ))}
                    </div>
                    <PaginationButtons />
                </div>
            </section>
        </div>
    );
}

export default Home;