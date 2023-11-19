import { createContext, useReducer } from "react";


export const GlobalContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        // case "LIGHT-THEME":
        //     return { ...state, theme: "light" }

        // case "DARK-THEME":
        //     return { ...state, theme: "dark" }

        case "FETCH":
            console.log(action.payload)
            return { ...state, data: action.payload }

        case "SignInSuccess":
            return { ...state, user: action.payload, isAuthenticated: true }; // Agrega isAuthenticated al estado
        case "SignOut":
            return { ...state, user: null, isAuthenticated: false }; // Agrega isAuthenticated al estado

        case "SignInError":
            return { ...state, error: action.payload }
            
        default:
            return state; //isAuthenticated, que indica si el usuario está autenticado o no.
    }
};
const apiURL = "http://localhost:8080/api/v1"

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

    return (
        <GlobalContext.Provider value={{ state, dispatch, dataApi, apiURL }}>
            {children}
        </GlobalContext.Provider>
    );
};