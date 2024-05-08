import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext.jsx';

export const InitialPage = () => {
  const { user } = useContext(AuthContext); 

  // Si el usuario está presente, redirige a la página principal
  if (user) {
    return <Navigate to="/home" />;
  } else {
    // Si no hay usuario, redirige al componente de inicio de sesión
    return <Navigate to="/login" />;
  }
};
