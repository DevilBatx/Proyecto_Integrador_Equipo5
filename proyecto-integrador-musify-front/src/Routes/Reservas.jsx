import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Components/Utils/GlobalContext";
import { useNavigate } from "react-router-dom";
import Gallery from "../Components/Gallery";
import ReservationCalendar from "../Components/ReservationCalendar";
import imgLog from "../assets/Products/dino.png";
import { useParams } from "react-router-dom";

const Reservas = () => {
  const params = useParams();
  const productId = params.id;
  const { state, apiURL } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingResponse, setBookingResponse] = useState(null);

  const goBack = () => {
    window.history.back();
  };

  const redirectToHome = () => {
    navigate("/");
  };

  const formatDateForDisplay = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const day = `${d.getDate()}`.padStart(2, "0");
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  

  const formatDateForPayload = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleBooking = async () => {
    const startDate = formatDateForPayload(state.booking.startDate);
    const endDate = formatDateForPayload(state.booking.endDate);
    const productId = state.data.id || 0;
    const userId = state.user.id || 0;

    const bookingData = {
      startDate,
      endDate,
      productId,
      userId,
    };

    try {
      const response = await fetch(`${apiURL}/auth/bookings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

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
    <div className="p-14 mt-14 mb-10 mx-16 bg-gray-100 rounded-xl shadow-md h-screen">
      <div className="flex justify-end">
        <button
          onClick={goBack}
          className="text-xs font-semibold uppercase transition ease-in-out hover:text-sky-500 my-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-10 h-10 text-gray-700 hover:text-orange-500 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Gallery Section */}
        <div className=" p-2 mb-4 lg:mb-0 ">
          <Gallery images={images} />
        </div>

        {/* Description, User Data, and Reservation Calendar Section */}
        <div className="lg:w-3/4 p-2">
          <div>
            <h1 className="text-xl text-orange-500 font-bold py-5">
              {state.data.name}
            </h1>
            <h1 className="text-xl text-orange-500 font-bold py-5">
              Descripcion:
            </h1>
            <p>{state.data.description}</p>
          </div>

          {state.user && (
            <div className="mt-4">
              <h1 className="text-xl text-orange-500 font-bold py-5">
                Datos del usuario para la reserva:
              </h1>
              <p>Nombre: {state.user.name}</p>
              <p>Apellido: {state.user.lastName}</p>
              <p>Email: {state.user.email}</p>
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-center mt-10">
            <ReservationCalendar productId={productId} />
            <button
              onClick={handleBooking}
              className="text-white border-solid border-2 border-orange-500 bg-orange-500 hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 text-center hover:text-orange-500 mt-4 lg:mt-0 lg:ml-10"
            >
              Reservar
            </button>
          </div>
        </div>
      </div>

      {showConfirmationModal && (
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-90">
          <div className="bg-white scale-50 mt-28 ">
            <div className="flex flex-col items-start p-4">
              <div className="flex justify-items-end w-full border-b pb-4">
                <h2 className="text-gray-400 font-small">
                  Confirmación de Reserva
                </h2>
                <button
                  className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  <span>✖</span>
                </button>
              </div>
              <div className="w-full content-center justify-center">
                <p className="text-3xl text-center m-4 font-bold">
                  Gracias {state.user.name} ¡Tu reserva fue confirmada con éxito!
                </p>
                <div className="m-7">
                <p className="my-1 text-2xl text-center">Producto: {state.data.name}</p>
                  <p className="my-2 text-2xl text-center">
                    Desde: {formatDateForDisplay(state.booking.startDate)}
                  </p>
                  <p className="my-2 text-2xl text-center">
                    Hasta: {formatDateForDisplay(state.booking.endDate)}
                  </p>
                  <p className="mt-2 text-center text-2xl">Reserva #{bookingResponse?.id}</p>                  
                  {state.data.images && state.data.images.length > 0 && (
                    <img
                      src={state.data.images[0].imageUrl}
                      alt={state.data.name}
                      className="scale-80"
                    />
                  )}
                </div>
              </div>
              <div className="ml-auto">
                <button
                  className="bg-orange-400 hover:bg-orange-500 text-2xl text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={redirectToHome}
                >
                  Volver al inicio
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
