import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


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
    if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
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
    <div className='p-3 max-w-lg mx-auto my-10'>
      <h1 className='text-3 text-center font-semibold my-20'>Crear cuenta</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder='Name'
          className={`border p-3 rounded-lg ${errors.name && 'border-red-500'}`}
          id='name'
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-xs font-semibold">{errors.name}</p>}

        <input
          type="text"
          placeholder='Last Name'
          className={`border p-3 rounded-lg ${errors.lastName && 'border-red-500'}`}
          id='lastName'
          onChange={handleChange}
        />
        {errors.lastName && <p className="text-red-500 text-xs font-semibold">{errors.lastName}</p>}

        <input
          type="text"
          placeholder='Email'
          className={`border p-3 rounded-lg ${errors.email && 'border-red-500'}`}
          id='email'
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email}</p>}

        <input
          type="password"
          placeholder='Password'
          className={`border p-3 rounded-lg ${errors.password && 'border-red-500'}`}
          id='password'
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500 text-xs font-semibold">{errors.password}</p>}

        <button disabled={loading} className='bg-orange-600 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Ya estás registrado?</p>
        <Link to={'/login'}>
          <span className='text-blue-700'>Ingresar</span>
        </Link>
      </div>
      {message && (
        <p className={`mt-5 font-semibold ${message.isSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {message.message}
        </p>
      )}
    </div>
  );
};


export default SignUp;