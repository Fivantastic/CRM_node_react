import { useContext } from 'react';
import { Header } from '../components/Header/Header.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import './mainLayout.css';
import { ThemeContext } from '../context/ThemeContext.jsx';

export function MainLayout({ children }) {
  const { theme } = useContext(ThemeContext);
  const changeMode = theme ? 'dark' : 'light';

  return (
    <div className="main-layout-container">
      <NavBar className="navbar-layout" />
      <Header className="header-layout" />
      <main className={`main-layout ${changeMode}`}>{children}</main>
    </div>
  );
}
