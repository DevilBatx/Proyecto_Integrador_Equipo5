import React, {useContext} from 'react'
import logo from '../assets/logo.png'
import Avatar from '../Components/Avatar'
import { GlobalContext } from '../Components/Utils/GlobalContext';

const Profile = () => {
  const { state } = useContext(GlobalContext);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3x1 font-semibold text-center my-7'>Perfil</h1>
      <form className=' flex flex-col gap-4'>
        <Avatar/>
        <input className='border p-3 rounded-lg' type="text" placeholder='Nombre' id='firstName' value={state.userReducer.user.name} />
        <input className='border p-3 rounded-lg' type="text" placeholder='Apellido' id='lastName' value={state.userReducer.user.lastName} />
        <input className='border p-3 rounded-lg' type="email" placeholder='Email' id='email' value={state.userReducer.user.email} />
      </form>
    </div>
  )
}

export default Profile