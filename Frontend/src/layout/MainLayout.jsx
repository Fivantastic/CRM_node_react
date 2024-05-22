import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { Header } from '../components/Header/Header.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import './mainLayout.css';

export function MainLayout({ children, title }) {
  const { theme } = useContext(ThemeContext);
  const changeMode = theme ? 'light' : 'dark';

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
