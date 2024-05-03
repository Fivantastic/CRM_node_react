import { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

// Creamos el contexto de autenticación
export const AuthContext = createContext();

// Creamos el proveedor de autenticación
export const AuthProvider = ({ children }) => {
    // Estado para almacenar el token de autenticación
    const [token, setToken] = useState(null);
    // Estado para manejar errores
    const [error, setError] = useState(null);

    // Efecto para cargar el token desde las cookies al montar el componente
    useEffect(() => {
        const cookies = new Cookies();
        const tokenFromCookie = cookies.get('token');
        console.log('token', token);
        if (tokenFromCookie) {
            setToken(tokenFromCookie);
        } else {
            setError('No se encontró el token en las cookies.');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Función para actualizar el token y guardar en las cookies
    const updateToken = (newToken) => {
        const cookies = new Cookies();
        cookies.set('token', newToken, { path: '/', sameSite: 'None', secure: true });
        setToken(newToken);
    };

    return (
        // Proporcionamos el estado de autenticación y la función de actualización a los componentes hijos
        <AuthContext.Provider value={{ token, setToken: updateToken, error }}>
            {children}
        </AuthContext.Provider>
    );
};
