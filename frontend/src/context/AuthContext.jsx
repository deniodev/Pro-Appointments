import { createContext, useEffect, useReducer } from "react";

let user = null;
if (typeof localStorage !== 'undefined') {
    const userFromLocalStorage = localStorage.getItem('user');
    try {
        if (userFromLocalStorage !== null) {
            user = JSON.parse(userFromLocalStorage);
        }
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
    }
}

const initialState = {
    user,
    role: typeof localStorage !== 'undefined' ? localStorage.getItem('role') : null,
    token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null,
}

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
                token: null,
            };

        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
            };

        case 'LOGOUT':
            return {
                user: null,
                role: null,
                token: null,
            };

        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(state.user))
            localStorage.setItem('token', state.token)
            localStorage.setItem('role', state.role)
        }
    }, [state]);

    return <authContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
        {children}
    </authContext.Provider>
}
