import { Outlet } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import { useEffect, useContext } from 'react';
import { GlobalContext } from './Components/Utils/GlobalContext';
import { validarToken } from './api/AuthApi.js';

function AppMain() {
    const {dispatch } = useContext(GlobalContext);

    useEffect(() => {
        // Comprueba si existe un token en sessionStorage
        const token = sessionStorage.getItem('token');
        //debugger;
        if (token  ) {
            // El token es válido, autentica al usuario y muestra el avatar
            const user = JSON.parse(sessionStorage.getItem('user'));
            
            dispatch({ type: "SIGN_IN_SUCCESS", payload: user });          
        } else {
            // El token no es válido o no existe, muestra los botones de inicio de sesión
            dispatch({ type: 'SIGN_OUT' });
        }     
    }, []);


    return (
        <div>
        <Header />
        <Outlet />
        <Footer />
        </div>
    );
    }

    export default AppMain;