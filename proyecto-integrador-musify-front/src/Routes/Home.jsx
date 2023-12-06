import React from 'react';
import Search from '../Components/Search';
import Category from '../Components/Category';
import fondo2 from '../assets/fondo2.jpg';
import Calendar from '../Components/Calendar';
import PaginationButtons from '../Components/PaginationButtons';
import { useContext } from "react";
import { GlobalContext } from "../Components/Utils/GlobalContext";
import SearchWithCalendar from '../Components/SearchWithCalendar';


const Home = () => {
    const { apiURL } = useContext(GlobalContext);


    const handleSearch = (term) => {
        // Implementa la lógica de búsqueda de productos aquí
        console.log(`Se buscará el producto con el término: ${term}`);
    };

    return (
        <div className="bg-white min-h-screen mt-20">
            {/*Banner/buscador*/}
            <section>
                <div
                    className="w-full h-[60vh] bg-cover"
                    style={{ backgroundImage: " url(" + fondo2 + ")" }}
                ><div className="w-full h-[60vh] bg-cover">
                        <SearchWithCalendar />
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl text-orange-500 font-bold md:h-full pt-20">
                        Categorías
                    </h2>
                    <div className="flex gap-2">
                        <Category />
                    </div>
                </div>
            </section>
            <section className="mb-8 flex gap-5 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl text-orange-500 font-bold mb-4 p-10">Recomendados</h2>
                    <PaginationButtons endPoint={`${apiURL}/public/products/random`} />

                </div>
            </section>
        </div>
    );
};

export default Home;
