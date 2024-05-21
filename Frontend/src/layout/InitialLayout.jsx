// src/layouts/InitialLayout.jsx
import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx';
import './InitialLayout.css';

export const InitialLayout = ({ children }) => {
  const user = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Determinar si debemos comenzar en pantalla completa o dividida
  const isInitialPath = location.pathname === '/';
  const [startClicked, setStartClicked] = useState(false);
  const [delayedStart, setDelayedStart] = useState(!isInitialPath);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isInitialPath) {
      setStartClicked(true);
      setDelayedStart(true);
    }
  }, [isInitialPath]);

  useEffect(() => {
    if (startClicked && isInitialPath) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 1300); // Ajuste de tiempo para la navegación
      return () => clearTimeout(timer);
    }
  }, [startClicked, navigate, isInitialPath]);

  const handleStartClick = () => {
    setStartClicked(true);
    setTimeout(() => {
      setDelayedStart(true);
    }, 300); 
  };

  if (user) {
    return <Navigate to="/home" />;
  }

  const leftPaneWidth = delayedStart ? (isMobile ? '0' : '50%') : '100%';
  const rightPaneWidth = delayedStart ? (isMobile ? '100%' : '50%') : '0';

  return (
    <div className={`initial-layout-container ${delayedStart ? 'split-screen' : 'full-screen'}`}>
      <div className="welcome-screen">
        <div className="animated-initial left-pane" style={{ width: leftPaneWidth }}>
          <img className="logo-cosmic-intro" src="/Mesa_de_trabajo_1.png" alt="logo cosmic" />
          {!startClicked && isInitialPath && <button className="start-button" onClick={handleStartClick}>LAUNCH</button>}
        </div>
        <div className="login-screen right-pane" style={{ width: rightPaneWidth, visibility: delayedStart ? 'visible' : 'hidden' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
