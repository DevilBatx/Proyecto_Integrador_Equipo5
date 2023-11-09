import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { GlobalContext } from './Utils/GlobalContext';


export default function PrivateRoute() {
    const { state, dispatch } = useContext(GlobalContext);
    return state.userReducer.user ? <Outlet/> : <Navigate to='/login'/>;
}
