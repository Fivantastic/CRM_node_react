import { ProfileNav } from '../ProfileNav/ProfileNav.jsx';
import { Notification } from '../Header/Notification.jsx';
import './Header.css';

export const Header = ({ title }) => {
  return (
    <header className="header-container">
      <h1 className="header-title-pages">{title}</h1>
      <div className="header-icons">
        <Notification />

      </div>
        <ProfileNav />
    </header>
  );
};
