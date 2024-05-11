import { useDirection } from '@mantine/core';
import { ThemeSwicher } from '../ThemeSwicher.jsx';
import { ProfileNav } from '../ProfileNav/ProfileNav.jsx';
import './Header.css';

export const Header = () => {
  const { toggleDirection, dir } = useDirection(); // Obtener la dirección y la función de cambio de dirección

  return (
    <header className="header-container">
      {/* Botón de cambio de dirección */}
      <button className="action-icon" onClick={() => toggleDirection()} aria-label="Toggle Direction">
        {/* Icono de dirección según la dirección actual */}
        <img className="iconReverse" src={dir === 'rtl' ? './loop.svg' : './loop.svg'} alt="Direction Icon" />
      </button>

      {/* Otros componentes del encabezado */}
      <ThemeSwicher />
      <ProfileNav />
    </header>
  );
};
