import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#F2A649] via-[#D97236] to-[#D97236] mt-auto">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0">
            <img src={logo} className="h-8 mr-3" alt="Musify Logo" />
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">Musify</span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/about" className="font-bold mr-4 hover:underline md:mr-6 text-black-500">About</Link>
            </li>
            <li>
              <Link to="/privacy" className="font-bold mr-4 hover:underline md:mr-6 text-black-500">Politica de Privacidad</Link>
            </li>
            <li>
              <Link to="/licensing" className="font-bold mr-4 hover:underline md:mr-6 text-black-500">Licensing</Link>
            </li>
            <li>
              <Link to="/contact" className="font-bold mr-4 hover:underline md:mr-6 text-black-500">Contacto</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="font-bold block text-sm sm:text-left text-black">Musify™ 2023 - All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
