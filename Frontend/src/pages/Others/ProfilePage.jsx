import { useSetUserInfo, useUser } from '../../context/authContext.jsx';
import ChangePasswordPop from '../../components/PagesComponents/Profile/ChangePasswordPop.jsx';
import { MainLayout } from '../../layout/MainLayout.jsx';
import { HelpMe } from '../../components/PagesComponents/Profile/HelpMe.jsx';
import ImageUpload from '../../components/forms/ImageUpload.jsx';
import { ThemeSwicher } from '../../components/ThemeSwicher.jsx';
import { useEffect, useState } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
import { ChangeInfo } from '../../components/PagesComponents/Profile/ChangeInfo.jsx';
const URL = import.meta.env.VITE_URL;
import '../../components/PagesComponents/Profile/ProfileChange.css';

export const ProfilePage = () => {
  const setUserInfo = useSetUserInfo();
  const [infoProfile, setInfoProfile] = useState([]);
  const token = useUser();

  useEffect(() => {
    getInfoProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getInfoProfile = async () => {
    try {
      const response = await fetch(`${URL}/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setInfoProfile(responseData.data);
        setUserInfo(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener la lista:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la información del perfil:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la información del perfil',
      });
    }
  };

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = './profile.svg';
  };

  const user = infoProfile;

  const traducirRole = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'deliverer':
        return 'Repartidor';
      case 'salesAgent':
        return 'Comercial';
      default:
        return 'Desconocido';
    }
  };
  
  return (
    <MainLayout title="Settings">
      <section id="profile_container" className="mainContainer">
        <section id="account">
          <div id="account_info">
            <h2 id="profile_title">Your account</h2>
            <ul id="profile_info">
              <li id="profile_name">
                <p className='info_paragraph title-Par'>Nombre</p>
                <p className='info_paragraph info'>{user.name + ' ' + user.last_name}</p>
              </li>
              <li id="profile_phone">
                <p className='info_paragraph title-Par'>Teléfono</p>
                <p className='info_paragraph info'>{user.phone}</p>
              </li>
              <li id="profile_role">
                <p className='info_paragraph title-Par'>Rol</p>
                <p className='info_paragraph info'>{traducirRole(user.role)}</p>
              </li>
              <li id="profile_email">
                <p className='info_paragraph title-Par'>Correo</p>
                <p className='info_paragraph info'>{user.email}</p>
              </li>
              <li id="profile_password">
                <p className='info_paragraph title-Par'>Contraseña</p>
                <p className='info_paragraph info'>********</p>
              </li>
            </ul>
            <span id="profile_img_section">
              <div id="profile_img_container">
                <div id="profile_img_circle">
                  <img 
                    className="avatarProfileSetting" 
                    src={user.avatar ? `${URL}/uploads/image/${user.id_user}/${user.avatar}` : './profile.svg'} 
                    alt="Avatar del usuario" 
                    onError={handleError}
                  />
                </div>
              </div>
              <ImageUpload updateinfo={getInfoProfile} />
            </span>
          </div>
          <div id="account_settings">
            <h2 id="profile_title-settings">Your settings</h2>
            <div id="profile_settings_container">
              <ChangeInfo updateinfo={getInfoProfile} user={user} />
              <ChangePasswordPop token={token} />
              <ThemeSwicher id="profile_theme-settings" />
              <HelpMe id="profile_help-settings" />
            </div>
          </div>
          <button id="profile_back" className='profile_back-button' onClick={() => window.history.back()}>Volver</button>
        </section>
      </section>
    </MainLayout>
  );
};
