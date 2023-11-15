import React, { useState, useEffect } from 'react';
import {
  AddProduct,
  ListProducts,
  PlaceholderButton1,
  PlaceholderButton2
} from '../AdminPanel';

const AdminPage = () => {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(window.innerWidth <= 800);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileOrTablet(window.innerWidth <= 800);
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isMobileOrTablet) {
        return <div className="p-10 mt-28 text-center ">Pagina no disponible para este dispositivo</div>;
        {/*arreglar el footer para cuando se usa otra resolucion*/}
    }

    return (
        <div className="p-16 mt-14 bg-gray-100 rounded-xl shadow-md">    
            <h2 className="text-2xl mb-6 font-bold text-center">Panel de Administracion</h2>            
            <div className="flex flex-col space-y-4  bg-orange-50 p-6 rounded-lg shadow-lg md:w-2/3 mx-auto">
                <AddProduct />
                <ListProducts />
                <PlaceholderButton1 />
                <PlaceholderButton2 />
                {/* Agregar aca el resto de las opciones de ser necesario */}
            </div>
        </div>
    );
};

export default AdminPage;
