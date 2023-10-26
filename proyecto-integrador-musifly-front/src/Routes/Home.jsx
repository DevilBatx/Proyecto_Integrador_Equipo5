import React from 'react';
import Search from '../Components/Search';
import Card from '../Components/Card';
import Fondo from '../assets/Products/Fondo.mp4'
import Category from '../Components/Category';

const Home = () => {
    const handleSearch = (term) => {
        // Implementa la lógica de búsqueda de productos aquí
        console.log(`Se buscará el producto con el término: ${term}`);
    }
    return (
        <div className="bg-white min-h-screen p-16">
            <section className="mb-8 h-auto w-auto">
                <Search onSearch={handleSearch} />
            </section>
            <section className="mb-8 flex gap-5 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl text-orange-500 font-bold mb-4 p-10 md:h-full">Categorias</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <Category />
                        <Category />
                        <Category />
                        <Category />
                        <Category />
                    </div>
                </div>
            </section>
            <section className="mb-8 flex gap-5 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl text-orange-500 font-bold mb-4 p-10">Recomendaciones de Productos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;