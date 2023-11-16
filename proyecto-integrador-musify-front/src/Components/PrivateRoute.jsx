import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { GlobalContext } from './Utils/GlobalContext';

export default function PrivateRoute() {
    const { state } = useContext(GlobalContext);

    // Si el usuario está autenticado, permite el acceso a la ruta, de lo contrario, redirige al login.
    return state.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
