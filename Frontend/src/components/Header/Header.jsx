// header.jsx
import { ThemeSwicher } from '../ThemeSwicher.jsx';
import { ProfileNav } from '../ProfileNav/ProfileNav.jsx';
import './Header.css';

export const Header = ({ title }) => {
  return (
    <header className="header-container">
      <h1 className="header-title-pages">{title}</h1>
      <ThemeSwicher />
      <ProfileNav />
    </header>
  );
};
