import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            setError('No se encontró el token en el localStorage.');
        }
    }, []);

    const updateToken = (newToken) => {
        // Aquí puedes agregar lógica para validar el nuevo token antes de almacenarlo
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    // Aquí puedes agregar lógica adicional para manejar la expiración del token y la validación

    return (
        <AuthContext.Provider value={{ token, setToken: updateToken, error }}>
            {children}
        </AuthContext.Provider>
    );
};
