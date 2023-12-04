import React, { useState, useEffect } from 'react';
import { AddProduct, ListProducts, UserRoles, PlaceholderButton2 } from '../AdminPanel';
import imgLog from '../assets/Products/image8.png'

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
        return <div className="p-28 mt-28 text-center ">Pagina no disponible para este dispositivo</div>;
        {/*arreglar el footer para cuando se usa otra resolucion*/ }
    }

    return (
        <div className=' bg-center bg-cover relative' style={{ backgroundImage: " url(" + imgLog + ")" }}>
        <div className="p-96 mt-50 rounded-xl shadow-md h-screen">
            <h2 className="text-2xl mb-6 font-bold text-center">Panel de Administración</h2>
            <div className="flex flex-col space-y-4 p-4">
                <AddProduct />
                <ListProducts />
                <UserRoles />
                <ManageCategories />
                {/* Agregar aca el resto de las opciones de ser necesario */}
            </div>
        </div>
        </div>
    );
};

export default AdminPage;
