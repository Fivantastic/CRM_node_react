import { createContext, useContext, useEffect } from 'react';
import { renewTokenIfExpired } from '../Services/authService.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('session', '');

    useEffect(() => {
        const renewToken = async () => {
            if (user) {
                await renewTokenIfExpired();
            }
        };

        renewToken();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

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
