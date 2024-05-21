import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx';
import './InitialLayout.css';
import VideoComponent from '../components/PagesComponents/Initial/VideoComponet.jsx';

export const InitialLayout = ({ children }) => {
  const user = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const isInitialPath = location.pathname === '/';
  const [startClicked, setStartClicked] = useState(false);
  const [delayedStart, setDelayedStart] = useState(!isInitialPath);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const [showImage, setShowImage] = useState(!isInitialPath);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
      setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (startClicked && isInitialPath) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 1300); // Ajuste de tiempo para la navegación
      return () => clearTimeout(timer);
    }
  }, [startClicked, navigate, isInitialPath]);

  useEffect(() => {
    if (isInitialPath) {
      const imageTimer = setTimeout(() => {
        setShowImage(true);
      }, 1000); // Retraso de 1 segundo para mostrar la imagen

      const buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 2000); // Retraso de 2 segundos para mostrar el botón

      return () => {
        clearTimeout(imageTimer);
        clearTimeout(buttonTimer);
      };
    } else {
      setShowImage(true);
      setShowButton(true);
    }
  }, [isInitialPath]);

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
          <img className={`img-cosmic-intro ${showImage ? 'fade-in' : ''}`} src="/Logo_cosmicNeon.svg" alt="logo cosmic" />
          <VideoComponent className="videoInitial" isSmallScreen={isSmallScreen} />
          {!startClicked && isInitialPath && showButton && <button className="start-button fade-in" onClick={handleStartClick}>LAUNCH</button>}
        </div>
        <div className="login-screen right-pane" style={{ width: rightPaneWidth, visibility: delayedStart ? 'visible' : 'hidden' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
