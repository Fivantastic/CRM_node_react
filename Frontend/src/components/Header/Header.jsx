// import { Magnifier } from "./Magnifier.jsx"
import { ProfileHeader } from './ProfileHeader.jsx';
import './Magnifier.css';
import './Header.css';
import { ThemeSwicher } from '../ThemeSwicher.jsx';

export const Header = () => {
  return (
    <header className="header-container">
      {/* <Magnifier /> */}
      <ThemeSwicher />
      <ProfileHeader />
    </header>
  );
};
