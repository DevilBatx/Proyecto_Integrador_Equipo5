import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = ({ title = "Musify", subtitle = "Donde la música y la pasión se encuentran", showAuthButtons = true }) => {
    return (
        <header className='bg-orange-500 fixed top-0 left-0 right-0 top-0'>
            <div className='container mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between'>
                <div className='flex items-center mb-2 md:mb-0'>
                <Link to="/"><img className='h-16 md:h-20' src={logo} alt="logoEmpresa" /></Link>
                    <div className="ml-2 md:ml-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-blue">{title}</h1>
                        <p className="hidden md:block text-sm text-blue">{subtitle}</p>
                    </div>
                </div>
                {showAuthButtons && (
                    <div className='flex gap-2'>
                        <Link to="/login"><button className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded-full shadow text-sm md:text-base">Crear cuenta</button></Link>
                        <Link to="/login"><button className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded-full shadow text-sm md:text-base">Iniciar sesión</button></Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;