import Swal from 'sweetalert2';
import defaultAvatar from '/profile.svg'; 
import { UserButton } from '../../buttons/UserButton.jsx';

export const ProfileButton = ({ userData, isActive }) => {

  // Define la función que maneja el clic en el botón
  const handleClick = () => {
    // Muestra la información del usuario al hacer clic en el botón
    showUserInfo(userData, isActive);
  };

  // Define la función para mostrar la información del usuario
  const showUserInfo = (userData, isActive) => {
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

    console.log(isActive);

    // Construye el contenido del modal con la información del usuario
    const addressConcatenated = userData.address ? `${userData.address} ${userData.number}, ${userData.floor ? 'Piso ' + userData.floor : ''} ${userData.letter_number ? 'Letra ' + userData.letter_number : ''}, ${userData.city}` : 'Dirección no disponible';

    const activeText = isActive ? 'Activo' : 'Inactivo';
    const activeClass = isActive ? 'active' : 'inactive';

    const userInfoHtml = `
      <section>
        <div class="container-avatar">
          <div class="container-avatar-active-inside-modal ${activeClass}">
            <img src="${userData.avatar || defaultAvatar}" alt="Avatar del usuario" class="avatar" />
          </div>
        </div>
        <div class="container-details-modal">
          <p><strong>Nombre: </strong> ${userData.name}</p>
          <p><strong>Apellidos: </strong> ${userData.last_name}</p>
          <p><strong>Email: </strong> ${userData.email}</p>
          <p><strong>Teléfono: </strong> ${userData.phone}</p>
          <p><strong>Dirección: </strong> ${addressConcatenated}</p>
          <p><strong>Rol en la empresa: </strong> ${traducirRole(userData.role)}</p>
          <p><strong>Estado: </strong> <span class="${activeClass}">${activeText}</span></p>
          <p><strong>Biografía: </strong> ${userData.biography}</p>
        </div>
      </section>
    `;

    // Muestra el modal con la información del usuario
    Swal.fire({
      title: 'Perfil de Usuario',
      html: userInfoHtml,
      allowOutsideClick: false,
      showCancelButton: false,
      confirmButtonText: 'Cerrar',
    });
  };

  return (
    <UserButton onClick={handleClick} />
  );
};
