import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Gallery from '../Components/Gallery';
import Calendar from '../Components/Calendar';
import imgLog from '../assets/Products/dino.png'

const Reservas = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    useEffect(() => {
        if (!state.isAuthenticated) {
            // Si el usuario no está autenticado, muestra el mensaje y el enlace de inicio de sesión
            setShowLoginMessage(true);
        } else {
            // Si el usuario está autenticado, verifica y carga las imágenes
            setShowLoginMessage(false);
            if (state.data && state.data.images && state.data.images.length > 0) {
                setImages(state.data.images);
            }
        }
    }, [state.isAuthenticated, state.data]);


    // Muestra el mensaje y el enlace de inicio de sesión si el usuario no está autenticado
    if (showLoginMessage) {
        return (
            
            <div className="flex flex-col items-center justify-center mx-auto text-center h-screen">
                <img className='mb-5' src={imgLog} alt="Not Found" />
                <h1 className="text-4xl text-orange-500 font-bold py-5">
                    ¡Debes iniciar sesión para reservar un producto!
                </h1>
                <p>
                    Haz <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>click aquí</span> para iniciar sesión.
                </p>
            </div>
            
        );
    }

    // Si el usuario está autenticado, muestra el resto del contenido
    return (
        <div>
            <div className='p-20 mt-5 '>
                <div className='flex flex-1 justify-between'>
                    <h1 className='text-center text-4xl text-orange-500 font-bold py-5'>Reservas de instrumentos</h1>
                </div>
                <h1 className='text-left text-xl text-orange-500 font-bold py-5'>{state.data.name}</h1>
                    <Gallery images={images} />
                <div>
                    <h1 className='text-left text-xl text-orange-500 font-bold py-5'> Descripcion:  </h1>
                    <p>{state.data.description}</p>
                    <h1 className='text-left text-xl text-orange-500 font-bold py-5'> Detalles: </h1>
                </div>
                {state.user && (
                    <div>
                        <h1 className='text-left text-xl text-orange-500 font-bold py-5'>Datos del usuario para la reserva:</h1>
                        <p>Nombre: {state.user.name}</p>
                        <p>Apellido: {state.user.lastName}</p>
                        <p>Email: {state.user.email}</p>
                        {/* Agrega más campos según la estructura de tu objeto de usuario */}
                    </div>
                )}
                <div>
                    <br />
                    <Calendar />
                </div>
            </div>
        </div>
    );
};

export default Reservas;