import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import imgLog from '../assets/Products/imgLogin.png'

const SignIn = () => {
  const [formData, setFormData] = useState();
  const { state, dispatch, apiURL } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({ type: 'SIGN_IN_ERROR', payload: '' })
    setFormData({
      ...formData,  //Mantiene la informacion previa que va ingresando el usuario
      [e.target.id]: e.target.value, //Con el id muestra que campo es el que cambia
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); //Preeve que la pagina se actualize al darle click en registrarse
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch(`${apiURL}/auth/login`,{ //Ahi iria la api para la request del fetch
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch({ type: 'SIGN_IN_ERROR', payload: 'Credenciales inválidas. Por favor, verifica tu email y contraseña.' })
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        let url;
        data.rolUser == 1 ? url =`${apiURL}/auth/admin/adminProfile` : url = `${apiURL}/auth/user/userProfile`
        const userResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`,
          },
        });
        dispatch({ type: "SIGN_IN_SUCCESS", payload: await userResponse.json() });
        navigate('/');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({ type: 'SIGN_IN_ERROR', payload: 'Credenciales inválidas. Por favor, verifica tu email y contraseña.' });
      } else {
        dispatch({ type: 'SIGN_IN_ERROR', payload: 'Hubo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.' });
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  return (
    <div className='w-full h-screen min-h-screen flex items-start'>
      <div className=' w-1/2 h-full flex flex-col'>
        <img src={imgLog} alt="ImagenBg" className='w-full h-full object-cover' />
      </div>
      <div className=' w-1/2 h-full min-h-screen flex flex-col  p-16 my-10'>
        <p className=' text-xl pt-10'>Bienvenido de nuevo! </p>
        <h1 className='text-3xl text-center font-semibold p-5'>Ingresar</h1>
        <div className=' bg-orange-50 border-2 border-gray-200 rounded-xl overflow-hidden p-5'>
          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
            <input type="text" placeholder='Email' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
            <input type="password" placeholder='Contraseña' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
            <button disabled={state.loading} className='bg-orange-600 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>{state.loading ? 'Cargando...' : 'Ingresar'}</button>
          </form>
        </div>
        <div className='flex gap-2 mt-5'>
          <p>No tienes una cuenta?</p>
          <Link to={'/register'}>
            <span className='text-blue-700'>Crear cuenta</span>
          </Link>
        </div>
        {state.error && <p className='text-red-500 mt-5'>{state.error}</p>}
      </div>
    </div>
  )
}
export default SignIn;