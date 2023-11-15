import React from 'react';
import { Link } from 'react-router-dom';


const Card = ({ data: { id,  name, description, images } }) => {
  return (
     // card
        <div className="w-full max-w-sm border-2 border-gray-200 rounded-xl overflow-hidden">
            {/*infoCard*/}
            <div className="grid grid-cols-1 grid-rows-2 gap-1 items-center text-center m-2">
               {[...Array()].map((i, index) => (
                <svg key={index} className="w-4 h-4 text-black mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
               </svg>
                ))}  

              {/*imagen*/}
                <div className=''>  
                  <Link to={`/details/${id}`}>
                      {images.length > 0 && <img className="rounded-t-lg w-full h-32" src={images[0].imageUrl} alt="imagen del producto" />}
                  </Link>
                </div>
              {/*nombre*/}
                <div className="flex flex-col text-center">
                   <Link to={`/details/${name}`}>
                    <h5 className="text-xl font-semibold tracking-tight text-black">{name}</h5>
                   </Link>
                </div>
                       {/*<span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>*/}
    
                <div className="flex items-center flex-col">
                    <span className="text-2xl font-bold text-gray-900 pb-3">USD 599</span> 
                    <Link to={`/details/${id}`} className="text-white bg-orange-700 hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-100 dark:hover:text-orange-500 dark:focus:ring-blue-800">
                     Ver más
                    </Link>
                </div>
             </div>
        </div>
  );
}

export default Card;