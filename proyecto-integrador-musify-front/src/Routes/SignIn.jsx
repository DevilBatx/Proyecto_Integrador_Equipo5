import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Components/Utils/GlobalContext';

const SignIn = () => {
  const [formData, setFormData] = useState();
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,  //Mantiene la informacion previa que va ingresando el usuario
      [e.target.id]: e.target.value, //Con el id muestra que campo es el que cambia
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); //Preeve que la pagina se actualize al darle click en registrarse
    try {
      dispatch({ type: 'SignInStart' })
      const response = await fetch('http://localhost:8080/api/v1/auth/login', { //Ahi iria la api para la request del fetch
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch({ type: 'SignInError', payload: error.message })
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        // console.log(data.token)
        const userResponse = await fetch('http://localhost:8080/api/v1/auth/user/userProfile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`,
          },
        });
        dispatch({ type: 'SignInSuccess', payload: await userResponse.json() })  // Usa userData en lugar de userResponse.json()
        navigate('/')
      }
    } catch (error) {
      dispatch({ type: 'SignInError', payload: error.message })
    }
  }

  

  return (
    <div className='p-3 max-w-lg mx-auto my-10'>
      <h1 className='text-3 text-center font-semibold my-20'>Ingresar</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="password" placeholder='Contraseña' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={state.userReducer?.loading} className='bg-orange-600 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>{state.userReducer?.loading ? 'Cargando...' : 'Ingresar'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>No tienes una cuenta?</p>
        <Link to={'/register'}>
          <span className='text-blue-700'>Crear cuenta</span>
        </Link>
      </div>
      {state.userReducer?.error && <p className='text-red-500 mt-5'>{state.userReducer?.error}</p>}
    </div>
  )
}
export default SignIn;