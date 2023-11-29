import React from 'react';
import Search from '../Components/Search';
import Category from '../Components/Category';
import fondo2 from '../assets/fondo2.jpg';
import Calendar from '../Components/Calendar';
import PaginationButtons from '../Components/PaginationButtons';
import { useContext } from "react";
import { GlobalContext } from "../Components/Utils/GlobalContext";


const Home = () => {
    const { apiURL } = useContext(GlobalContext);


    const handleSearch = (term) => {
        // Implementa la lógica de búsqueda de productos aquí
        console.log(`Se buscará el producto con el término: ${term}`);
    }


    return (
        <div className="bg-white min-h-screen ">
            {/*Banner/buscador*/}
            <section>
                <div className='w-full h-[50vh] bg-cover' style={{ backgroundImage: " url(" + fondo2 + ")" }}>
                    <div className=' flex flex-col-3 p-[10%] gap-16 '>

                        <Search />

                        <Calendar />
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl text-orange-500 font-bold md:h-full pt-20">Categorias</h2>
                    <div className='flex gap-2'>
                        <Category />
                    </div>
                </div>
            </section>
            <section className="mb-8 flex gap-5 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl text-orange-500 font-bold mb-4 p-10">Recomendados</h2>
                    <PaginationButtons endPoint = {`${apiURL}/public/products/random`} />

                </div>
            </section>
        </div>
    );
}

export default Home;