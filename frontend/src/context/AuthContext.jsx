import { createContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";

const initialState = {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
    role: Cookies.get('role') || null,
    token: Cookies.get('token') || null
};
  

export const authContext = createContext(initialState);

const authReducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN_START':

        return {
            user: null,
            role: null,
            token: null
        }

        case 'LOGIN_SUCCESS':

        return {
            user: action.payload.user,
            role: action.payload.role,
            token: action.payload.token
        }

        case 'LOGOUT':

        return {
            user: null,
            role: null,
            token: null
        }

        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        Cookies.set('user', JSON.stringify(state.user));
        Cookies.set('role', state.role);
        Cookies.set('token', state.token);
    }, [state])

    return (
        <authContext.Provider 
            value={{
            user: state.user,
            token: state.token,
            role: state.role,
            dispatch
            }}
        >
            {children}
        </authContext.Provider>
    )

}
