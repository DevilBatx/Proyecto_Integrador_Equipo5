import { createContext, useReducer } from "react";


export const GlobalContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        // case "LIGHT-THEME":
        //     return { ...state, theme: "light" }

        // case "DARK-THEME":
        //     return { ...state, theme: "dark" }

        case "FETCH":
            return { ...state, data: action.payload }
        case "USER_FETCH":
            return { ...state, userData: action.payload}
        case "SIGN_IN_SUCCESS":
            return { ...state, user: action.payload, isAuthenticated: true }; // Agrega isAuthenticated al estado
        case "SIGN_OUT":
            return { ...state, user: null, isAuthenticated: false }; // Agrega isAuthenticated al estado
        case "SIGN_IN_ERROR":
            return { ...state, error: action.payload }
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        default:
            return state; //isAuthenticated, que indica si el usuario está autenticado o no.
    }
};
const apiURL = "http://localhost:8080/api/v1"
//const apiURL = "http://54.197.145.57:8080/api/v1"
export const ContextProvider = ({ children }) => {

    const initialState = { data: [], userReducer: { user: null, loading: false, error: null } }

    const [state, dispatch] = useReducer(reducer, initialState);

    const dataApi = (url) => {
        return fetch(url)
            .then((response) => response.json())
            .then((result) => {
                dispatch({ type: "FETCH", payload: result })
            })

    }
    const authDataApi = (url) => {
        return fetch(url, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => response.json())
            .then((result) => {
                dispatch({ type: "USER_FETCH", payload: result })
            })

    }

    return (
        <GlobalContext.Provider value={{ state, dispatch, dataApi, authDataApi, apiURL }}>
            {children}
        </GlobalContext.Provider>
    );
};