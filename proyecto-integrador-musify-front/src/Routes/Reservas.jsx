import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Components/Utils/GlobalContext";
import { useNavigate } from "react-router-dom";
import Gallery from "../Components/Gallery";
import ReservationCalendar from "../Components/ReservationCalendar";
import imgLog from "../assets/Products/dino.png";

const Reservas = () => {
  const { state, apiURL } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingResponse, setBookingResponse] = useState(null);

  const formatDateForDisplay = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const day = `${d.getDate()}`.padStart(2, '0');
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDateForPayload = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleBooking = async () => {
    const startDate = formatDateForPayload(state.booking.startDate);
    const endDate = formatDateForPayload(state.booking.endDate);
    const productId = state.data.id || 0;
    const userId = state.user.id || 0;

    const bookingData = {
      id: 0,
      startDate,
      endDate,
      productId,
      userId,
    };

    try {
      const response = await fetch(
        `${apiURL}/auth/bookings`,
        {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setBookingResponse(result);
        setShowConfirmationModal(true);
      } else {
        console.error("Booking failed:", response.status);
      }
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };

  useEffect(() => {
    if (!state.isAuthenticated) {
      setShowLoginMessage(true);
    } else {
      setShowLoginMessage(false);
      if (state.data && state.data.images && state.data.images.length > 0) {
        setImages(state.data.images);
      }
    }
  }, [state.isAuthenticated, state.data]);

  if (showLoginMessage) {
    return (
      <div className="flex flex-col items-center justify-center mx-auto text-center h-screen">
        <img className="mb-5" src={imgLog} alt="Not Found" />
        <h1 className="text-4xl text-orange-500 font-bold py-5">
          ¡Debes iniciar sesión para reservar un producto!
        </h1>
        <p>
          Haz{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            click aquí
          </span>{" "}
          para iniciar sesión.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="p-20 mt-5 ">
        <div className="flex flex-1 justify-between">
          <h1 className="text-center text-4xl text-orange-500 font-bold py-5">
            Reservas de instrumentos
          </h1>
        </div>
        <h1 className="text-left text-xl text-orange-500 font-bold py-5">
          {state.data.name}
        </h1>
        <Gallery images={images} />
        <div>
          <h1 className="text-left text-xl text-orange-500 font-bold py-5">
            Descripcion:
          </h1>
          <p>{state.data.description}</p>
          <h1 className="text-left text-xl text-orange-500 font-bold py-5">
            Detalles:
          </h1>
        </div>
        {state.user && (
          <div>
            <h1 className="text-left text-xl text-orange-500 font-bold py-5">
              Datos del usuario para la reserva:
            </h1>
            <p>Nombre: {state.user.name}</p>
            <p>Apellido: {state.user.lastName}</p>
            <p>Email: {state.user.email}</p>
          </div>
        )}
        <div className="flex flex-row justify-center items-center space-x-4 my-6 ">
          <ReservationCalendar />
          <button
            onClick={handleBooking}
            className="text-white border-solid border-2 border-orange-500 bg-orange-500 hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 text-center hover:text-orange-500"
          >
            Reservar
          </button>
        </div>
      </div>

      {showConfirmationModal && (
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-90">
          <div className="bg-white rounded-lg w-1/2">
            <div className="flex flex-col items-start p-4">
              <div className='flex items-center w-full border-b pb-4'>
                <h2 className="text-gray-900 font-medium text-lg">Confirmación de Reserva</h2>
                <button
                  className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  <span>✖</span>
                </button>
              </div>
              <div className="w-full py-10 content-center justify-center">
                <p className="text-base">¡Reserva confirmada con éxito!</p>
                <p>Desde: {formatDateForDisplay(state.booking.startDate)}</p>
                <p>Hasta: {formatDateForDisplay(state.booking.endDate)}</p>
                <p>Producto: {state.data.name}</p>
                {state.data.images && state.data.images.length > 0 && (
                  <img src={state.data.images[0].imageUrl} alt={state.data.name} />
                )}
                <p>ID de Reserva: {bookingResponse?.id}</p>
              </div>
              <div className='ml-auto'>
                <button
                  className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservas;
