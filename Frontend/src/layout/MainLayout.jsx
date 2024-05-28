import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { AuthContext } from '../context/authContext.jsx';
import Swal from 'sweetalert2';
import { Header } from '../components/Header/Header.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import './mainLayout.css';

export function MainLayout({ children, title }) {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const changeMode = theme ? 'light' : 'dark';

  useEffect(() => {
    if (!user) {
      navigate('/');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'warning',
        title: 'Inicia sesión para entrar en Cosmic.',
      });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="main-layout-container">
      <NavBar className="navbar-layout" />
      <Header className="header-layout" title={title} />
      <main className={`main-layout ${changeMode}`} id={`${changeMode}`}>
        {children}
      </main>
    </div>
  );
}
