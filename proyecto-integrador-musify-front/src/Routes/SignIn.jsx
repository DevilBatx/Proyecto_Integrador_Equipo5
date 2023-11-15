import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Components/Utils/GlobalContext';

const SignIn = () => {
  const [formData, setFormData] = useState();
  const { state, dispatch, apiURL } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({ type: 'SignInError', payload: '' })
    setFormData({
      ...formData,  //Mantiene la informacion previa que va ingresando el usuario
      [e.target.id]: e.target.value, //Con el id muestra que campo es el que cambia

    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); //Preeve que la pagina se actualize al darle click en registrarse
    try {
      const response = await fetch(`${apiURL}/auth/login`, { //Ahi iria la api para la request del fetch
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch({ type: 'SignInError', payload: 'Credenciales inválidas. Por favor, verifica tu email y contraseña.' })
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        // console.log(data.token)
        let url;
        data.rolUser === 1 ? url = `${apiURL}/auth/admin/adminProfile` : url = `${apiURL}/auth/user/userProfile`;
        const userResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`,
          },
        });
        //console.log(await userResponse.json());
       // debugger;
        dispatch({ type: "SignInSuccess", payload: await userResponse.json() })  // Usa userData en lugar de userResponse.json()
        navigate('/profile')
        //console.log(state);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({ type: 'SignInError', payload: 'Credenciales inválidas. Por favor, verifica tu email y contraseña.' });
      } else {
        dispatch({ type: 'SignInError', payload: 'Hubo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.' });
      }
    }
  }



  return (
    <div className='p-3 max-w-lg mx-auto my-10'>
      <h1 className='text-3 text-center font-semibold my-20'>Ingresar</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Email' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="password" placeholder='Contraseña' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={state.userReducer?.loading} className='bg-orange-600 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>{state.userReducer?.loading ? 'Cargando...' : 'Ingresar'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>No tienes una cuenta?</p>
        <Link to={'/register'}>
          <span className='text-blue-700'>Crear cuenta</span>
        </Link>
      </div>
      {state.error && <p className='text-red-500 mt-5'>{state.error}</p>}
    </div>
  )
}
export default SignIn;