import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { renewTokenIfExpired } from '../Services/authService.js';
import { getUserDataFromToken } from '../Services/GetUserDataToken.js';

export const AuthContext = createContext();
export const RoleContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('session', '');
    const [userInfo, setUserInfo] = useState(null);
    const [role, setRole] = useState('');

    useEffect(() => {
        const renewToken = async () => {
            if (user) {
                await renewTokenIfExpired(user, setUser);
            }
        };

        const renewTokenAndSetInterval = async () => {
            await renewToken();
            const intervalId = setInterval(renewToken, 840000); // Renueva el token cada 14 minutos
            return intervalId;
        };

        const intervalIdPromise = renewTokenAndSetInterval();

        intervalIdPromise.then((intervalId) => {
            return () => clearInterval(intervalId);
        });

        // Extrae el rol del usuario del token
        if (user) {
            const { role } = getUserDataFromToken(user);
            setRole(role);
        }

        return () => {}; 

    }, [user, setUser]);

    return (
        <AuthContext.Provider value={{ user, setUser, userInfo, setUserInfo }}>
            <RoleContext.Provider value={{ role, setRole }}>
                {children}
            </RoleContext.Provider>
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(AuthContext).user;
// eslint-disable-next-line react-refresh/only-export-components
export const useSetUser = () => useContext(AuthContext).setUser;

// eslint-disable-next-line react-refresh/only-export-components
export const useUserInfo = () => useContext(AuthContext).userInfo;
// eslint-disable-next-line react-refresh/only-export-components
export const useSetUserInfo = () => useContext(AuthContext).setUserInfo;

// eslint-disable-next-line react-refresh/only-export-components
export const useRole = () => useContext(RoleContext).role;
// eslint-disable-next-line react-refresh/only-export-components
export const useSetRole = () => useContext(RoleContext).setRole;
