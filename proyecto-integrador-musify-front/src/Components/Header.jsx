import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import Avatar from './Avatar';
import logo from '../assets/logo.png';

const Header = ({ title = "Musify", subtitle = "Donde la música y la pasión se encuentran" }) => {
    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);


    const handleLogout = () => {
        navigate('/login');
        sessionStorage.removeItem('token');
        dispatch({ type: 'SIGN_OUT' });
        sessionStorage.removeItem('user');
        
    };

    return (
        <header className="bg-gradient-to-b from-[#D97236] via-[#D97236] to-[#F2A649] z-50 fixed top-0 left-0 right-0 w-full bg-white shadow-md z-10 transform translate-y-0" >
            <div className='container mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between'>
                <div className='flex items-center mb-2 md:mb-0'>
                    <Link to="/"><img className='h-16 md:h-20' src={logo} alt="logoEmpresa" /></Link>
                    <div className="ml-2 md:ml-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-blue">{title}</h1>
                        <p className="hidden md:block text-sm text-blue font-semibold">{subtitle}</p>
                    </div>
                </div>
                {state.isAuthenticated ? (
                    <div className='flex gap-4 mt-4' onMouseLeave={() => setDropdownOpen(!isDropdownOpen)} >
                        <div className="relative group">
                            <button
                                id="dropdownAvatarNameButton"

                                className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-800 dark:hover:text-blue-700 md:me-0 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white relative"
                                type="button"
                                onMouseEnter={() => setDropdownOpen(!isDropdownOpen)}

                            >
                                <div>
                                    <h4><Avatar /></h4>
                                    <h4 className='font-semibold'>{state.user?.name} {state.user?.lastName}</h4>
                                </div>
                                <div className={`absolute right-2 transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                    <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path fill="#000" d="M5 6L0 0h10L5 6z" />
                                    </svg>
                                </div>
                            </button>
                            {isDropdownOpen && (

                                <div id="dropdownAvatarName" className="z-10 bg-white divide-y divide-gray-300 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute mt-0" >
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white" >
                                        <div className="truncate">{state.user.email}</div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownAvatarNameButton">
                                        <li>
                                            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mi Perfil</Link>
                                        </li>
                                        {state.user.isAdmin == 0 && (<li>
                                            <Link to="/misReservas" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mis Reservas</Link>
                                        </li>)}
                                        {state.user.isAdmin == 1 && (<li>
                                            <Link to="/administracion" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Panel Administracion</Link>
                                        </li>)}
                                    </ul>
                                    <div className="py-2">
                                        <button  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => handleLogout()}>Cerrar sesión</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='flex gap-2'>
                        <Link to="/register"><button className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded-full shadow text-sm md:text-base">Crear cuenta</button></Link>
                        <Link to="/login"><button className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded-full shadow text-sm md:text-base">Iniciar sesión</button></Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;