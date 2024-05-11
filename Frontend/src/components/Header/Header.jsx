import { ThemeSwicher } from '../ThemeSwicher.jsx';
import { ProfileNav } from '../ProfileNav/ProfileNav.jsx';
import './Header.css';

export const Header = () => {
  return (
    <header className="header-container">
      <ThemeSwicher />
      <ProfileNav />
    </header>
  );
};
