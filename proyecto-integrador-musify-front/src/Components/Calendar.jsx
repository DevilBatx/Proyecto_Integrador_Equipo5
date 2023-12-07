import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { GlobalContext } from './Utils/GlobalContext';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const Calendar = ({ onSetStartDate, onSetEndDate }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const { dispatch } = useContext(GlobalContext);

    useEffect(() => {
        // Dispatch para enviar las fechas al contexto global
        dispatch({
            type: "SET_DATE",
            payload: {
                startDate,
                endDate,
            },
        });
    }, [startDate, endDate]);

    return (
        <div className="flex felx-col">
            <span className="mx-5 text-white text-center pt-1">Desde</span>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <DatePicker
                    locale="es"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    selected={startDate}
                    dateFormat='dd/MM/yyyy'
                    onSelect={(date) => {
                        setStartDate(date);
                        onSetStartDate?.(date);
                    }}
                    minDate={new Date()}
                    maxDate={addMonths(new Date(), 4)}
                    placeholderText="Fecha inicial"
                />
            </div>
            <span className="mx-5 text-white text-center pt-1">Hasta</span>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <DatePicker
                    locale="es"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    selected={endDate}
                    dateFormat='dd/MM/yyyy'
                    onSelect={(date) => {
                        setEndDate(date);
                        onSetEndDate?.(date);
                    }}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={addMonths(new Date(), 4)}
                    placeholderText="Fecha final"
                />
            </div>
        </div>
    );
}

export default Calendar;