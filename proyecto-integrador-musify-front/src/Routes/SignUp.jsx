import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import imgLog from '../assets/Products/imgLogin.png'


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Validación para el nombre (más de 3 caracteres)
    if (formData.name.length < 4) {
      newErrors.name = 'El nombre debe tener al menos 4 caracteres';
    }

    if (formData.name.trim() === '') {
      newErrors.name = 'El nombre no puede estar vacío';
    }

    if (formData.lastName.length < 4) {
      newErrors.lastName = 'El apellido debe tener al menos 4 caracteres';
    }

    // Validación para el apellido (no vacío)
    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'El apellido no puede estar vacío';
    }

    // Validación para el email (formato de email)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    // Validación para la contraseña (más de 6 caracteres)
    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);

    // Retorna true si no hay errores, de lo contrario false
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        // if (!response.ok) {
        //   throw new Error(data.message || 'Error en la solicitud');
        // }
        // setLoading(false);
        //debugger;
        if (response.status === 200) {
          setMessage({ message: 'Usuario registrado correctamente, Redirigiendo...', isSuccess: true });
          setLoading(false);
          // Agrega un temporizador de 3 segundos antes de redirigir
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else if (response.status === 409) {
          setMessage({ message: 'El correo electrónico ya está registrado. Intenta con otro.', isSuccess: false });
        } else {
          setMessage({ message: data.message || 'Error desconocido en la respuesta', isSuccess: false });
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        // Manejar el error de la solicitud
        setMessage(error.message || 'Error en la solicitud');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className='w-full h-screen flex items-start'>
      <div className='w-1/2 h-full flex flex-col'>
        <img src={imgLog} alt="ImagenBg" className='w-full h-full object-cover' />
      </div>
      <div className='w-1/2 flex flex-col justify-center p-16 my-10'>
        <h1 className='text-2xl text-center font-semibold pb-5'>Crear cuenta</h1>
        <div className='max-h-full bg-orange-50 border-2 border-gray-200 rounded-xl overflow-hidden p-5'>
          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder='Name'
                className={`border p-3 rounded-lg ${errors.name && 'border-red-500'}`}
                id='name'
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs font-semibold mt-1">{errors.name}</p>}
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder='Last Name'
                className={`border p-3 rounded-lg ${errors.lastName && 'border-red-500'}`}
                id='lastName'
                onChange={handleChange}
              />
              {errors.lastName && <p className="text-red-500 text-xs font-semibold mt-1">{errors.lastName}</p>}
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder='Email'
                className={`border p-3 rounded-lg ${errors.email && 'border-red-500'}`}
                id='email'
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs font-semibold mt-1">{errors.email}</p>}
            </div>

            <div className="flex flex-col">
              <input
                type="password"
                placeholder='Password'
                className={`border p-3 rounded-lg ${errors.password && 'border-red-500'}`}
                id='password'
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs font-semibold mt-1">{errors.password}</p>}
            </div>

            <button disabled={loading} className='bg-orange-600 text-white p-2 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>
              {loading ? 'Cargando...' : 'Registrarse'}
            </button>
          </form>
        </div>
        <div className='flex items-center justify-center mt-5 gap-2'>
          <p>Ya estás registrado?</p>
          <Link to={'/login'}>
            <span className='text-blue-700'> Ingresar </span>
          </Link>
        </div>
        {message && (
          <p className={`mt-5 font-semibold ${message.isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {message.message}
          </p>
        )}
      </div>
    </div>
  );
}
export default SignUp;