import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';

export const InitialPage = () => {
  const { token } = useContext(AuthContext); 
  console.log(token);

  // Si el token está presente, redirige a la página principal
  if (token) {
    return <Navigate to="/home" />;
  } else {
    // Si no hay token, redirige al componente de inicio de sesión
    return <Navigate to="/login" />;
  }
};
