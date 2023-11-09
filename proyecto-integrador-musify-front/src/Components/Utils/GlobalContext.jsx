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


const userReducer = (state, action) => {
    switch (action.type) {
        case 'SignInSuccess':
            return { ...state, loading: false, user: action.payload, error: null }
        case 'SignInStart':
            return { ...state, loading: true, user: null, error: null }
        case 'SignInError':
            return { ...state, loading: false, user: null, error: action.payload }
        case 'SignOut':
            return { ...state, loading: false, user: null, error: null }
        default:
            return state;
    }
}

function combineReducers(reducers) {
    return (state = {}, action) => {
        const newState = {};
        for (let key in reducers) {
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    }
}


export const ContextProvider = ({ children }) => {

    const initialState = { data: [], userReducer: { user: null, loading: false, error: null } }

    const [state, dispatch] = useReducer(combineReducers({
        data: reducer,
        userReducer: userReducer
    }), initialState);

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