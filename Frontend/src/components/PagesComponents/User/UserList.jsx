import { useState, useEffect } from "react";
import defaultAvatar from '/profile.svg'; 
import { ProfileButton } from "./ProfileButton.jsx";
import { ButtonMoreUserActions } from "../../buttons/Profile/ButtonMoreUserActions.jsx";
import { useUser } from "../../../context/authContext.jsx";
import { DeleteGenericModal } from "../../forms/DeleteGenericModal.jsx";
import '../../../Styles/Pages/StyleUserList.css';

// Objeto de mapeo de roles
const roleMapping = {
  salesAgent: 'Comercial',
  deliverer: 'Repartidor',
  admin: 'Administrador'
};

export const UserList = ({ user, id, activeUser, onDelete }) => {
  const token = useUser();
  const userData = user;
  const userId = id;

  // Estado para controlar si el usuario está activo o no
  const [isActive, setIsActive] = useState(user.active);

  // Actualizar isActive cuando user.active cambie
  useEffect(() => {
    setIsActive(user.active);
  }, [user.active]);

  // Obtener el rol traducido
  const translatedRole = roleMapping[user.role] || user.role;

  return (
    <>
      <figure className={`container-avatar-active ${isActive ? 'active' : 'inactive'}`}>
        <img src={user.avatar || defaultAvatar} alt="Avatar del usuario" className="avatar" />
      </figure>
      <section className="container-details-actions">
        <article className="details">
          <h2 className="userName">{`${user.name} ${user.last_name}`}</h2>
          <p className="role">{translatedRole}</p> 
        </article>
        <nav className="actions">
          <ProfileButton userData={userData} isActive={isActive} />
          <ButtonMoreUserActions id={userId} activeUser={activeUser} isActive={isActive} token={token} />
          <DeleteGenericModal id={id} onDelete={onDelete} token={token} typeModule="user" typeModuleMessage="Usuario"/>
        </nav>
      </section>
    </>
  );
};
