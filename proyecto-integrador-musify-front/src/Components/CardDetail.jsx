import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './Utils/GlobalContext';
import { useParams, Link, useNavigate } from 'react-router-dom';
import imgRestaurado from '../assets/Products/Refubrish.png'
import imgCredito from '../assets/Products/Credito.png'
import imgGarantia from '../assets/Products/Garantia.png'
import imgDelivery from '../assets/Products/Delivery.png'
import imgEfectivo from '../assets/Products/Efectivo.png'

const CardDetail = () => {
  const params = useParams();
  const { state, dataApi, apiURL } = useContext(GlobalContext);
  const [showCalendar, setShowCalendar] = useState(false);
  const [visible, setVisible] = useState(false)
  const [showModalimg, setShowModalimg] = useState(false)
  const [saveImg, setSaveimg] = useState("")
  const navigate = useNavigate();

  const goBack = () => {
    window.history.back();
  };

  const handleReservaClick = async () => {
    // Primero, asegúrate de tener los datos del producto
    await getProduct();

    // Luego, verifica si el usuario está autenticado
    if (state.isAuthenticated) {
      // Si está autenticado, navega a la página de reservas con el ID del producto
      navigate(`/reservas/${params.id}`);
    } else {
      // Si no está autenticado, muestra un mensaje o realiza alguna otra acción
      setShowCalendar(!showCalendar);
    }
  };

  const getProduct = async () => {
    await dataApi(`${apiURL}/public/products/${params.id}`);
  };


  const handleMoreClick = () => {
    setVisible(!visible);
  };


  const handleImgClick = (imageUrl) => {
    setShowModalimg(!showModalimg)
    setSaveimg(imageUrl)
  }

  useEffect(() => {
    getProduct();
  }, [params]);

  return (
    <>
      <div className='p-20 mt-20 '>
        <div className='flex flex-1 justify-between'>
          <h1 className='text-left text-xl text-orange-500 font-bold py-5'>{state.data.name}</h1>
          <button onClick={goBack}
            className='mr-25 text-xs font-semibold uppercase transition ease-in-out hover:text-sky-500'
          > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 text-gray-700 hover:text-orange-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
          </button>
        </div>
        <div className=' grid h-full w-full grid-cols-2 gap-3 pt-4 md:grid-cols-4'>
          <div className='col-span-2 row-span-2 aspect-[4/2.8] border border-gray-400 rounded-md'>
            {state.data && state.data.images && state.data.images.length > 0 && <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center "
              src={state.data.images[0].imageUrl} />}
          </div>


          {Array.from({ length: 4 }).map((_, index) => (
            <div className=' aspect-[4/2.8] border border-gray-400 rounded-md' key={index}>
              {state.data && state.data.images && state.data.images.length > index + 1 && (
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={state.data.images[index + 1].imageUrl}
                />
              )}
            </div>
          ))}

        </div>
        <div className='text-right p-5 gap-4'>
          <button onClick={() => handleMoreClick()}
            className="bg-white hover:bg-gray-100  text-orange-500 font-bold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded-full shadow text-sm md:text-base">
            {visible ? "Ver menos" : "Ver mas"}
          </button>
          <Link to={`/reservas/${params.id}`}>
            <button className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded-full shadow text-sm md:text-base ml-2">
              Reservas disponibles
            </button>
          </Link>
        </div>
        {visible && (
          <div className="flex gap-2">
            {state.data.images.map((image, index) =>
              <button key={index} onClick={() => handleImgClick(image.imageUrl)}>
                <img src={image.imageUrl} alt={image.name} className='w-24 h-24 object-cover rounded-md' />
              </button>
            )}
          </div>)
        }

        {showModalimg && (
          <div className=" z-50 flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-90">
            <div className="bg-white rounded-lg w-96">
              <form className="w-full">
                <div className="flex flex-col items-start p-4">
                  <div className='flex items-center w-full border-b pb-4'>
                    <button
                      className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer "
                      onClick={() => setShowModalimg(false)}
                    >
                      <span>✖</span>
                    </button>
                  </div>
                  <div>
                    <img src={saveImg} alt="" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )
        }

        <h2 className='text-left text-orange-500 font-bold p-5'>DESCRIPCION:</h2>
        <p>{state.data.description}</p>

        <h2 className='text-left text-orange-500 font-bold p-5'>CARACTERISTICAS:</h2>
        <ul className='pl-5 flex flex-wrap justify-center items-center space-x-4'>
          <li className='flex items-center mb-4'>
            <img src={imgRestaurado} alt="Refurbish" className='w-10 h-10' />
            <span className="ml-2">Restaurado</span>
          </li>
          <li className='flex items-center mb-4'>
            <img src={imgCredito} alt="Refurbish" className='w-10 h-10 mr-1' />
            <span className="ml-2">Crédito y Débito</span>
          </li>
          <li className='flex items-center mb-4'>
            <img src={imgEfectivo} alt="Refurbish" className='w-10 h-10 mr-1' />
            <span className="ml-2">Efectivo</span>
          </li>
          <li className='flex items-center mb-4'>
            <img src={imgGarantia} alt="Refurbish" className='w-10 h-10 mr-1' />
            <span className="ml-2">Garantía</span>
          </li>
          <li className='flex items-center mb-4'>
            <img src={imgDelivery} alt="Refurbish" className='w-12 h-12 mr-1' />
            <span className="ml-2">Delivery</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default CardDetail