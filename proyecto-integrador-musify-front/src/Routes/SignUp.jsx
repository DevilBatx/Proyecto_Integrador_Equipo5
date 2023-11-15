import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import imgLog from '../assets/Products/imgLogin.png'

const SignUp = () => {


  const [formData, setFormData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('')
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


      setLoading(true)
      const response = await fetch('http://localhost:8080/api/v1/auth/register', { //Ahi iria la api para la request del fetch
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      console.log(await response)
      if (!response.ok) {
        throw new Error(data.message);
      }

      //console.log(await response);

      if (data.succes === false) {
        setLoading(false);
        setError(data.message);
        return
      }
      setLoading(false)
      setError(null);
      navigate('/login')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }


  //console.log(formData);


  return (
    <div className='w-full h-screen flex items-start'>
        <div className=' w-1/2 h-full flex flex-col'>
            <img src={imgLog} alt="ImagenBg" className='w-full h-full object-cover' />
          </div>
          
           <div className=' w-1/2 h-full flex flex-col p-16 my-10'>
                <h1 className='text-3xl text-center font-semibold pb-5'>Crear cuenta</h1>
                  
                <div className=' h-screen bg-orange-50 border-2 border-gray-200 rounded-xl overflow-hidden p-5'>
                  <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
                  <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' onChange={handleChange} />
                  <input type="text" placeholder='Last Name' className='border p-3 rounded-lg' id='lastName' onChange={handleChange} />
                  <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
                  <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
                  <button disabled={loading} className='w-full bg-orange-600 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>{loading ? 'Cargando...' : 'Registrarse'}</button>
                  </form>
                </div>


                <div className='flex gap-2 mt-5'>
                    <p>Ya estas registrado?</p>
                       <Link to={'/login'}>
                          <span className='text-blue-700'>Ingresar</span>
                        </Link>
                </div>
                  {error && <p className='text-red-500 mt-5'>{error}</p>}
            </div>
    </div>
  )
}


export default SignUp;