import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  
  const [formData, setFormData]= useState();
  const [error, setError]= useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({ 
      ...formData,  //Mantiene la informacion previa que va ingresando el usuario
      [e.target.id]: e.target.value, //Con el id muestra que campo es el que cambia
    });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault(); //Preeve que la pagina se actualize al darle click en registrarse
    try {
        
        setLoading(true)
        const response = await fetch('api',{ //Ahi iria la api para la request del fetch
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(formData)
        });
        const data = await response.json();
        if(data.succes === false){
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

  console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto my-10'>
      <h1 className='text-3 text-center font-semibold my-20'>Crear cuenta</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Nombre' className='border p-3 rounded-lg' id='nombre' onChange={handleChange} />
        <input type="text" placeholder='Apellido' className='border p-3 rounded-lg' id='apellido'onChange={handleChange} />
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='Contraseña' className='border p-3 rounded-lg' id='contraseña'onChange={handleChange} />
        <button disabled={loading} className='bg-orange-600 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>{loading ? 'Cargando...' : 'Registrarse'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Ya estas registrado?</p>
        <Link to={'/login'}>
          <span className='text-blue-700'>Ingresar</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp;