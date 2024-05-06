import { useState, useEffect } from "react";
import '../PopsStyle/StyleUserList.css'
// import { UserButtonMoreInfo } from "./UserButtonMoreInfo.jsx";
import defaultAvatar from '/profile.svg'; 
import { ProfileButton } from "../buttons/ProfileButton.jsx";
import { ButtonMoreUserActions } from "../buttons/ButtonMoreUserActions.jsx";
import { useUser } from "../../context/authContext.jsx";

// Objeto de mapeo de roles
const roleMapping = {
  salesAgent: 'Comercial',
  deliverer: 'Repartidor',
  admin: 'Administrador'
};

export const UserList = ({ user, id, onDelete }) => {
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
    <li className="user">
      <div className={`container-avatar-active ${isActive ? 'active' : 'inactive'}`}>
        <img src={user.avatar || defaultAvatar} alt="Avatar del usuario" className="avatar" />
      </div>
      <div className="details">
        <h2>{`${user.name} ${user.last_name}`}</h2>
        <p>{translatedRole}</p> {/* Mostrar el rol traducido */}
      </div>
      <ButtonMoreUserActions id={userId} onDelete={onDelete} token={token}  />
      <ProfileButton userData={userData} />
    </li>
  );
};
