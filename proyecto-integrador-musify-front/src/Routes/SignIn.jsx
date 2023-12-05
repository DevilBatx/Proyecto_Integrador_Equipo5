import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import imgLog from '../assets/Products/image8.png'

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
      const response = await fetch(`${apiURL}/auth/login`, { //Ahi iria la api para la request del fetch
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
        sessionStorage.setItem('token', data.token);
        let url;
        data.rolUser == 1 ? url = `${apiURL}/auth/admin/adminProfile` : url = `${apiURL}/auth/user/userProfile`
        const userResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`,
          },
        });
        const user = await userResponse.json();
        sessionStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: "SIGN_IN_SUCCESS", payload: user });  
        console.log(user);
        
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
    <div className='w-full h-screen min-h-screen flex mt-16'>
      <div className=' w-full h-full flex flex-col'>
        <div className='w-screen h-[100vh] bg-center bg-cover bg-no-repeat relative ' style={{ backgroundImage: " url(" + imgLog + ")" }}>

          <div className='w-screen h-[100vh] border-orange-200  opacity-25 absolute top-0 left-0'></div>
          <div className='relative flex flex-col text-center gap-4 py-20  '>


            <div className='w-[35%] mx-auto bg-orange-50 border-2 border-gray-500  rounded-xl overflow-hidden p-5'>

              <h1 className='text-2xl text-center font-semibold '>Ingresar</h1>
              <form onSubmit={handleSubmit} className='p-5 flex flex-col gap-3'>
                <input type="text" placeholder='Email' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
                <input type="password" placeholder='Contraseña' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
                <button disabled={state.loading} className='bg-gradient-to-b from-[#D97236] via-[#D97236] to-[#F2A649] text-white font-bold p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>{state.loading ? 'Cargando...' : 'Ingresar'}</button>
              </form>
              {state.error && <p className='text-red-500 mt-5 mb-2'>{state.error}</p>}
              <p className='font-bold'>¿No tienes una cuenta?</p>
              <div className='flex items-center justify-center gap-2 mt-5'>
                <Link to={'/register'}>
                  <span className='text-blue-700 font-bold'>Crear cuenta</span>
                </Link>
              </div>


            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn;