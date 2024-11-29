import { createContext } from 'react';

// uses react's createContext function to 
// define what variables and functions that 
// are to be accessed across the application
// if needed

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    role: null,
    login: () => {},
    logout: () => {}
});