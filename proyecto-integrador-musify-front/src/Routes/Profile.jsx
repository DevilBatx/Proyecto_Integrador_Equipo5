import React, { useContext } from 'react';
import logo from '../assets/logo.png';
import Avatar from '../Components/Avatar';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { state } = useContext(GlobalContext);

  // Verifica si el usuario está autenticado, de lo contrario, redirige a la página de inicio de sesión
  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='p-6 max-w-lg mx-auto'>
      <h1 className='text-3x1 font-semibold text-center my-7'>Perfil</h1>
      <form className='flex flex-col gap-4'>
        <Avatar />
        <input className='border p-3 rounded-lg' type="text" placeholder='Nombre' id='firstName' defaultValue={state.user?.name} />
        <input className='border p-3 rounded-lg' type="text" placeholder='Apellido' id='lastName' defaultValue={state.user?.lastName} />
        <input className='border p-3 rounded-lg' type="email" placeholder='Email' id='email' defaultValue={state.user?.email} />
      </form>
    </div>
  );
};

export default Profile;