import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import imgLog from '../assets/Products/Guitarra1.jpeg'
import { GlobalContext } from '../Components/Utils/GlobalContext';


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null)
  const [accountCreated, setAccountCreated] = useState(false)
  const navigate = useNavigate();
  const { state, dispatch, apiURL } = useContext(GlobalContext);

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
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await fetch(`${apiURL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        console.log(response);

        if (response.status === 200) {
          setAccountCreated(true);
          setMessage({ message: 'Usuario registrado correctamente, Redirigiendo...', isSuccess: true });
          // Agrega un temporizador de 3 segundos antes de redirigir
          setTimeout(() => {
            dispatch({ type: 'SET_LOADING', payload: false });
            // navigate('/login');
          }, 3000);
        } else if (response.status === 409) {
          setMessage({ message: 'El correo electrónico ya está registrado. Intenta con otro.', isSuccess: false });
        } else {
          setMessage({ message: data.message || 'Error desconocido en la respuesta', isSuccess: false });
        }
        dispatch({ type: 'SET_LOADING', payload: false });

      } catch (error) {
        // Manejar el error de la solicitud
        setMessage(error.message || 'Error en la solicitud');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRedirection = () => {
    navigate('/login');
  };

  return (<div className='w-full h-full flex mt-16'>
    <div className='w-full h-full flex flex-col'>
      <div className='w-screen h-[100vh] bg-center bg-cover bg-no-repeat relative ' style={{ backgroundImage: " url(" + imgLog + ")" }}>
        <div className='absolute top-0 left-0 w-full h-full bg-white bg-opacity-20 p-52'>
          <div className=' relative flex flex-col text-center gap-4'>

            {!accountCreated ? (// Mostrar el formulario si la cuenta aún no se ha creado
              <>
                <div className=' w-[35%] mx-auto bg-orange-50 border-2 border-gray-500 rounded-xl overflow-hidden p-5'>
                  <h1 className='text-2xl text-center font-semibold pb-5'>Crear cuenta</h1>
                  <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        placeholder='Nombre'
                        className={`border p-3 rounded-lg ${errors.name && 'border-red-500'}`}
                        id='name'
                        onChange={handleChange}
                      />
                      {errors.name && <p className="text-red-500 text-xs font-semibold mt-1">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col">
                      <input
                        type="text"
                        placeholder='Apellido'
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
                        placeholder='Contraseña'
                        className={`border p-3 rounded-lg ${errors.password && 'border-red-500'}`}
                        id='password'
                        onChange={handleChange}
                      />
                      {errors.password && <p className="text-red-500 text-xs font-semibold mt-1">{errors.password}</p>}
                    </div>

                    <button disabled={state.loading} className='bg-gradient-to-b from-[#D97236] via-[#D97236] to-[#F2A649] text-white font-bold p-2 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>
                      {state.loading ? 'Cargando...' : 'Registrarse'}
                    </button>
                  </form>
                </div>

                <div className='flex items-center justify-center font-bold gap-2'>
                  <p className='text-white'>¿Ya estás registrado?</p>
                  <Link to={'/login'}>
                    <span className='text-blue-500'> Ingresar </span>
                  </Link>
                </div>
                <div>
                {message && (
                  <p className={`mt-5 font-semibold ${message.isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                    {message.message}
                  </p>
                )}
                </div>
              </>
            ) : (  // Mostrar el mensaje de bienvenida si la cuenta se ha creado con éxito
              <>
                <h1 className='text-2xl text-center font-semibold pb-5 text-white'>¡Bienvenido!</h1>
                <div className='max-h-full bg-orange-50 border-2 border-gray-200 rounded-xl overflow-hidden p-5'>
                  <p className="mt-5 font-semibold text-gray-700">
                    Usuario registrado correctamente. Te hemos enviado un correo de confirmación a {formData.email}. Por favor, verifica tu bandeja de entrada.
                    Si no encuentras el correo, también revisa la carpeta de correo no deseado o spam.
                  </p>
                </div>
                <p className="mt-2 text-sm mt-5 text-white">
                  ¿No has recibido el correo de confirmación?
                  <button
                    className="text-blue-300 ml-1 underline"
                    onClick={() => handleResendConfirmationEmail(formData.email)}
                    disabled={state.loading}
                  >
                    Reenviar correo
                  </button>
                  <button
                    className="text-blue-300 ml-1 underline"
                    onClick={() => handleRedirection()}
                    disabled={state.loading}
                  >
                    Iniciar sesión
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
export default SignUp;