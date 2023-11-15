import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import imgLog from '../assets/Products/imgLogin.png'

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
        let url;
        data.rolUser === 1 ? url = "http://localhost:8080/api/v1/auth/admin/adminProfile" : url = "http://localhost:8080/api/v1/auth/user/userProfile";
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
      dispatch({ type: 'SignInError', payload: error.message })
     // console.log(error);
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
                        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
                        <input type="password" placeholder='Contraseña' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
                        <button disabled={state.userReducer?.loading} className=' w-full bg-orange-600 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>{state.userReducer?.loading ? 'Cargando...' : 'Ingresar'}</button>
                      </form>
                    </div>

                  <div className='w-full flex gap-2 mt-5'>
                      <p>No tienes una cuenta?</p>
                         <Link to={'/register'}>
                            <span className='text-blue-700'>Crear cuenta</span>
                        </Link>
                    </div>
              {state.userReducer?.error && <p className='text-red-500 mt-5'>{state.userReducer?.error}</p>}
        </div>
        </div>
  )
}
export default SignIn;