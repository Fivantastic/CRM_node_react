import Swal from 'sweetalert2';
import defaultAvatar from './profile.svg'; 
import './UserInfoButtonStyle.css'

// Define la función para mostrar la información del usuario
const showUserInfo = (userData) => {
  // Construye el contenido del modal con la información del usuario
  const addressConcatenated = userData.address ? `${userData.address} ${userData.number}, ${userData.floor ? 'Piso ' + userData.floor : ''} ${userData.letter_number ? 'Letra ' + userData.letter_number : ''}, ${userData.city}` : 'Dirección no disponible';

  const isActive = userData.active === 1 ? 'Activo' : 'Inactivo';
  const activeClass = userData.active === 1 ? 'active' : 'inactive'; // Clase para el estado activo o inactivo

  const userInfoHtml = `
    <div>
      <div class="container-avatar-active-inside ${activeClass}">
        <img src="${userData.avatar || defaultAvatar}" alt="Avatar del usuario" class="avatar-inside" />
      </div>
      <p><strong>Nombre:</strong> ${userData.name}</p>
      <p><strong>Apellidos:</strong> ${userData.last_name}</p>
      <p><strong>Email:</strong> ${userData.email}</p>
      <p><strong>Teléfono:</strong> ${userData.phone}</p>
      <p><strong>Dirección:</strong> ${addressConcatenated}</p>
      <p><strong>Rol en la empresa:</strong> ${userData.role}</p>
      <p><strong>Estado:</strong> ${isActive}</p>
      <p><strong>Biografía:</strong> ${userData.biography}</p>
    </div>
  `;

  // Muestra el modal con la información del usuario
  Swal.fire({
    title: 'Información del Usuario',
    html: userInfoHtml,
    allowOutsideClick: false,
    showCancelButton: false,
    confirmButtonText: 'Cerrar',
  });
};

// Define el componente UserButtonMoreInfo
export const UserButtonMoreInfo = ({ userData }) => {
  // Define la función que maneja el clic en el botón
  const handleClick = () => {
    // Muestra la información del usuario al hacer clic en el botón
    showUserInfo(userData);
  };

  // Renderiza el botón
  return (
    <button className="setting-btn" onClick={handleClick}>
      <span className="bar bar1"></span>
      <span className="bar bar2"></span>
      <span className="bar bar1"></span>
    </button>
  );
};
