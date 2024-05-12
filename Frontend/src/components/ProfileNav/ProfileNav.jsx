import { useSetUser, useUser } from '../../context/authContext.jsx';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserDataFromToken } from '../../Services/GetUserDataToken.js';
import LogoutButton from '../buttons/Profile/LogoutButton.jsx';
import './ProfileNav.css';

export const ProfileNav = () => {
  const token = useUser();
  const setUser = useSetUser();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (token) {
      // Obtener datos del usuario desde el token
      const userDataFromToken = getUserDataFromToken(token);
      setUserData(userDataFromToken);
    }
  }, [token]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const getFullName = (name, lastName) => {
    if (lastName && lastName.includes(' ')) {
      return name + ' ' + lastName.split(' ')[0];
    } else if (lastName == null) {
      return name;
    } else {
      return name + ' ' + lastName;
    }
  };

  // Convertir el rol
  const getRoleName = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'deliverer':
        return 'Repartidor';
      case 'salesAgent':
        return 'Comercial';
      default:
        return role;
    }
  };

  const avatar = userData ? userData.avatar : './profile.svg';

  return (
    <nav className="profileNavContainer">
      <button
        className={`dropdown-toggle btn-profile ${isOpen ? 'open' : ''} ${isClicked ? 'clicked' : ''}`}
        onClick={() => {
          toggleDropdown();
          handleClick();
        }}
      >
        {userData && (
          <img
            className="avatarProfileNav"
            src={avatar}
            alt="Avatar del usuario"
          />
        )}
      </button>

      <ul className={`menuProfileNav ${isOpen ? 'open' : ''}`}>
        {userData && (
          <>
            <li className="nameBar navli navLink" key="nameBar">
              <p className="nameProfileNav">
                {getFullName(userData.name, userData.lastName)}
              </p>
            </li>
            <li className="roleBar navli navLink" key="roleBar">
              <p className="roleProfileNav">{getRoleName(userData.role)}</p>
            </li>
          </>
        )}
        <li className="btn-logout navli btn-perfilNav" key="logout">
          <LogoutButton setUser={setUser} />
          <img
            className="iconProfileNavLogout iconProfileNav"
            src="./iconLogout.svg"
            alt="Imagen de configuración de perfil"
          />
        </li>
        <NavLink
          exact
          to="/Profile"
          className="btn-home navli btn-perfilNav"
          key="profile"
        >
          <p>Settings</p>
          <img
            className="iconProfileNavSettings iconProfileNav"
            src="./settings.svg"
            alt="Imagen de configuración de perfil"
          />
        </NavLink>
      </ul>
    </nav>
  );
};
