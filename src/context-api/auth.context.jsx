import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

const AuthContext = createContext();

const AuthProviderWrapper = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const storeToken = (token) => {
        localStorage.setItem('token', token);
    }



    const authenticateUser = async () => {

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/auth/verify`, {
                    headers: { Authorization: `Bearer ${token}`, poweredBy: 'Kronos' }

                });
                const user = response.data;
                setUser(user);
                setIsLoggedIn(true);
                setIsLoading(false)

            } catch (err) {
                // if token is invalid
                console.log(' authentication status:', err.response.data);
                setUser(null);
                setIsLoggedIn(false);
                setIsLoading(true);
            }
        }
        else {
            // if token was removed
            setUser(null);
            setIsLoggedIn(false);
            setIsLoading(true);
        }


    }

    const logOutUser = () => {
        localStorage.removeItem('token');
        authenticateUser();
    }

    useEffect(() => {
        authenticateUser();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            isLoading,
            storeToken,
            authenticateUser,
            logOutUser

        }}>
            {children}
        </AuthContext.Provider>
    );
}
AuthProviderWrapper.propTypes = {
    children: PropTypes.node.isRequired
}


export { AuthContext, AuthProviderWrapper }