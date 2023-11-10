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

        default:
            return state;
    }
    }
    const apiURL = "http://localhost:8080/api/v1"

export const ContextProvider = ({ children }) => {

    const initialState = { data: [] }

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