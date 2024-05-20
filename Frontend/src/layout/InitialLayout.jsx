import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx';
import './InitialLayout.css';

export const InitialLayout = ({ children }) => {
  const user = useUser();
  const [startClicked, setStartClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/' || startClicked) {
      setStartClicked(true);
    }
  }, [location.pathname, startClicked]);

  useEffect(() => {
    if (startClicked && location.pathname === '/') {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [startClicked, navigate, location.pathname]);

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={`initial-layout-container ${startClicked ? 'split-screen' : 'full-screen'}`}>
      {!startClicked && location.pathname === '/' ? (
        <div className="welcome-screen">
          <img className="logo-cosmic-intro" src="./Mesa_de_trabajo_1.png" alt="logo cosmic" />
          <button className="start-button" onClick={() => setStartClicked(true)}>LAUNCH</button>
        </div>
      ) : (
        <div className="login-screen">
          <div className="left-panel">
          <img className="logo-cosmic-intro-dos" src="./Mesa_de_trabajo_1.png" alt="logo cosmic" />
          </div>
          <div className="right-panel">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
