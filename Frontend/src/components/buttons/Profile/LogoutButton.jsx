import { useNavigate } from 'react-router-dom';

function LogoutButton({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borrar el localStorage
    localStorage.removeItem('session');
    
    // Establecer el usuario en una cadena vacía
    setUser('');

    // Redirigir a la página de inicio de sesión
    navigate('/');
  };

  return (
      <p className="logout-button" onClick={handleLogout}>
        Logout
      </p>
  );
}

export default LogoutButton;
