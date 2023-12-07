import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addMonths } from 'date-fns';
import { GlobalContext } from './Utils/GlobalContext';

const ReservationCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const { dispatch, apiURL } = useContext(GlobalContext);

  useEffect(() => {

    fetch(`${apiURL}/public/bookings/1115/booked`)
      .then(response => response.json())
      .then(data => {
        if (data && data.dates) {
          const formattedDates = data.dates.map(dateString => new Date(dateString));
          setBookedDates(formattedDates);
          
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  useEffect(() => {
        dispatch({
      type: "SET_BOOKING",
      payload: {
        startDate, 
        endDate,
      },
    });
  }, [startDate, endDate, dispatch]);
  
  return (
    <div className="flex flex-row">
      <span className="text-orange-500 mr-4 font-bold text-center text-xl pt-1">Desde</span>
      <DatePicker
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        selected={startDate}
        onChange={date => setStartDate(date)}
        excludeDates={bookedDates}
        dateFormat='dd/MM/yyyy'
        minDate={new Date()}
        maxDate={addMonths(new Date(), 5)}
        placeholderText="Fecha inicial"
      />

      <span className="text-orange-500 mx-4 font-bold text-center text-xl pt-1">Hasta</span>
      <DatePicker
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        selected={endDate}
        onChange={date => setEndDate(date)}
        excludeDates={bookedDates}
        dateFormat='dd/MM/yyyy'
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Fecha final"
      />
    </div>
  );
}

export default ReservationCalendar;