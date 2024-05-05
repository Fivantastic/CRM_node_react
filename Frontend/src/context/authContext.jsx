import { createContext, useContext, useEffect } from 'react';
import { renewTokenIfExpired } from '../Services/authService.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('session', '');

    useEffect(() => {
        const renewToken = async () => {
            if (user) {
                await renewTokenIfExpired(user, setUser);
            }
        };

        renewToken();

        const intervalId = setInterval(renewToken, 840000); // Renueva el token cada 14 minutos

        return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta

    }, [user, setUser]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(AuthContext).user;
// eslint-disable-next-line react-refresh/only-export-components
export const useSetUser = () => useContext(AuthContext).setUser;
