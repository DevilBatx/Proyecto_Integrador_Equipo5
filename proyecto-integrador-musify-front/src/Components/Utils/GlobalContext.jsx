import { createContext, useReducer } from "react";

export const GlobalContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, data: action.payload };
    case "USER_FETCH":
      return { ...state, userData: action.payload };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        fromReservas: false, // Agrega fromReservas al estado
      };
    case "SIGN_OUT":
      return { ...state, user: null, isAuthenticated: false };
    case "SIGN_IN_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_FROM_RESERVAS":
      return { ...state, fromReservas: action.payload }; // Agrega acción para manejar fromReservas
    default:
      return state;
  }
};

const apiURL = "http://54.197.145.57:8080/api/v1";

export const ContextProvider = ({ children }) => {
  const initialState = {
    data: [],
    userData: null, // Agrega userData al estado
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    fromReservas: false, // Agrega fromReservas al estado
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const dataApi = (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "FETCH", payload: result });
      });
  };

  const authDataApi = (url) => {
    return fetch(url, { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "USER_FETCH", payload: result });
      });
  };

  return (
    <GlobalContext.Provider value={{ state, dispatch, dataApi, authDataApi, apiURL }}>
      {children}
    </GlobalContext.Provider>
  );
};
