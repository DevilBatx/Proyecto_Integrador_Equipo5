import React, { useContext } from 'react';
import logo from '../assets/logo.png';
import Avatar from '../Components/Avatar';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import { Navigate } from 'react-router-dom';
import imgLog from '../assets/Products/Bata1.jpeg'

const Profile = () => {
  const { state } = useContext(GlobalContext);

  // Verifica si el usuario está autenticado, de lo contrario, redirige a la página de inicio de sesión
  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className=' relative bg-center bg-cover ' style={{ backgroundImage: " url(" + imgLog + ") " }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
        <div className='p-12 max-w-lg mx-auto border-t-10 h-screen  ' >
          <h1 className='text-4xl font-semibold text-center mt-60 '>Perfil</h1>
          <form className='flex flex-col gap-4'>
            <Avatar />
            <input className='border p-3 rounded-lg' type="text" placeholder='Nombre' id='firstName' defaultValue={state.user?.name} />
            <input className='border p-3 rounded-lg' type="text" placeholder='Apellido' id='lastName' defaultValue={state.user?.lastName} />
            <input className='border p-3 rounded-lg' type="email" placeholder='Email' id='email' defaultValue={state.user?.email} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
