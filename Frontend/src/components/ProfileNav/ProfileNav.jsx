import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js'; // Importa CryptoJS para encriptación
import LogoutButton from '../buttons/Profile/LogoutButton.jsx';
import './ProfileNav.css';
import { useSetUser, useUser } from '../../context/authContext.jsx';
import { getUserDataFromToken } from '../../Services/GetUserDataToken.js';

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
      
      // Encripta los datos antes de guardarlos en el localStorage
      const encryptedData = encryptUserData(userDataFromToken);
      localStorage.setItem('userData', encryptedData);
      
      // Guarda los datos del usuario en el estado
      setUserData(userDataFromToken);
    }
  }, [token]);

  useEffect(() => {
    // Cuando se carga el componente, verifica si hay datos del usuario en el localStorage y desencripta si es necesario
    const encryptedUserData = localStorage.getItem('userData');
    if (encryptedUserData) {
      const decryptedUserData = decryptUserData(encryptedUserData);
      setUserData(decryptedUserData);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const encryptUserData = (data) => {
    // Convierte el objeto de usuario a JSON y luego encripta
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'claveDeEncriptacion').toString();
  };

  const decryptUserData = (encryptedData) => {
    // Desencripta y luego convierte a objeto
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'claveDeEncriptacion');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log('Decrypted data:', decryptedData);
    return decryptedData;
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

        <NavLink exact to="/Profile" className="btn-home navli btn-perfilNav" key="profile">
          <p>Settings</p>
          <img
            className="iconProfileNavSettings iconProfileNav"
            src="./settings.svg"
            alt="Imagen de configuración de perfil"
          />
        </NavLink>
        <li className="btn-logout navli btn-perfilNav" key="logout">
          <LogoutButton setUser={setUser} />
          <img className="iconProfileNavLogout iconProfileNav" src="./iconLogout.svg" alt="Imagen de configuración de perfil" />
        </li>
      </ul>
    </nav>
  );
};

