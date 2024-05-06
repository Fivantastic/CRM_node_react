import { useState, useEffect } from "react";
import { DeleteGenericModal } from "../forms/DeleteGenericModal.jsx";
import '../PopsStyle/StyleUserList.css'
import { UserButtonMoreInfo } from "./UserButtonMoreInfo.jsx";

export const UserList = ({ user, id, onDelete, token, typeModule, typeModuleMessage }) => {
    const userData = user;

  // Estado para controlar si el usuario está activo o no
  const [isActive, setIsActive] = useState(user.active);

  // Actualizar isActive cuando user.active cambie
  useEffect(() => {
    setIsActive(user.active);
  }, [user.active]);

  return (
    <li className="user">
      <div className={`container-avatar-active ${isActive ? 'active' : 'inactive'}`}>
        <img src={user.avatar} alt="Avatar del usuario" className="avatar" />
      </div>
      <div className="details">
        <h2>{`${user.name} ${user.last_name}`}</h2>
        <p>{user.role}</p>
      </div>
      <UserButtonMoreInfo userData={userData} />
      <DeleteGenericModal id={id} onDelete={onDelete} token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} />
    </li>
  );
};
