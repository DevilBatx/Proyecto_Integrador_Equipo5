import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { getBookingByUserId } from '../api/BookingApi';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import { useNavigate } from 'react-router-dom';

const HistorialReservas = () => {
    const [bookings, setBookings] = useState([]);
    const { apiURL, state } = useContext(GlobalContext);
    const navigate = useNavigate();
    const goBack = () => { window.history.back(); };


    const getBookings = async () => {
        try {
            const bookingList = await getBookingByUserId(apiURL, state?.user.id);
            setBookings(bookingList);
        } catch (error) {
            console.error('Error al obtener reservas:', error);
        }
    };


    useEffect(() => {
        getBookings();
    }, []);


    const handleEditClick = (product) => {
        navigate(`/details/${product.id}`);
    };



    return (
        <div className="p-14 mt-14 mb-10 mx-16 bg-gray-100 rounded-xl shadow-md h-screen" >
            <div className='flex flex-1 justify-end' >
                <button onClick={goBack}
                    className='mr-25 text-xs font-semibold uppercase transition ease-in-out hover:text-sky-500 mx-14 my-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 text-gray-700 hover:text-orange-500 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                </button>
            </div>
            <div className=" flex justify-between mb-6 ">
                <h1 className="text-2xl font-bold mb-6">Historial de Reservas</h1>
            </div>
            <div>
            <table className="w-full bg-white rounded-lg shadow-lg ">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th className="border p-3 ">ID</th>
                        <th className="border p-3">Desde</th>
                        <th className="border p-3">hasta</th>
                        <th className="border p-3">Producto</th>
                        <th className="border p-3">Imagen</th>
                        <th className="border p-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={booking.id} className={index % 2 ? 'bg-gray-100 ' : ''}>
                            <td className='text-center border p-3'>{booking.id}</td>
                            <td className="border p-3">{booking.startDate}</td>
                            <td className="border p-3">{booking.endDate}</td>
                            <td className="border p-3">{booking.product.name}</td>
                            <td className='border p-3 flex justify-center text-center'>
                                <img src={booking.product.images[0].imageUrl} alt="imagen de categoria" className='h-10' />
                            </td>
                            <td className='border p-3 items-center space-x-2'>
                                <button
                                    className="bg-gray-800 hover:bg-gray-100 text-white hover:text-gray-800 font-bold py-1 px-2 rounded shadow-md "
                                    onClick={() => handleEditClick(booking.product)}>Ver Producto</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}


export default HistorialReservas;