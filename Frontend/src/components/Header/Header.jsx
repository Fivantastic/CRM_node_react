

import './Magnifier.css';
import './Header.css';
import { ThemeSwicher } from '../ThemeSwicher.jsx';
import { ProfileNav } from '../ProfileNav/ProfileNav.jsx';

export const Header = () => {
  return (
    <header className="header-container">

      <ThemeSwicher />
      <ProfileNav />
    </header>
  );
};
