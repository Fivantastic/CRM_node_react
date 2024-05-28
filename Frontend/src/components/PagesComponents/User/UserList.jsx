import { useState, useEffect } from "react";
import defaultAvatar from '/profile.svg'; 
import { ProfileButton } from "./ProfileButton.jsx";
import { ButtonMoreUserActions } from "../../buttons/Profile/ButtonMoreUserActions.jsx";
import { useUser } from "../../../context/authContext.jsx";
import { DeleteGenericModal } from "../../forms/DeleteGenericModal.jsx";
const URL = import.meta.env.VITE_URL;
import '../../../Styles/Pages/StyleUserList.css';
// import { AddLoading } from "../../Loading/AddLoading.jsx";

// Objeto de mapeo de roles
const roleMapping = {
  salesAgent: 'Comercial',
  deliverer: 'Repartidor',
  admin: 'Administrador'
};

export const UserList = ({ user, id, activeUser, onDelete }) => {
  // const [onLoading, setOnLoading] = useState(true);

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

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = `${URL}/uploads/image/${user.id_user}/${user.avatar}`;
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //   setOnLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <>
      {/* {onLoading ? (
        <div className='container-avatar-active'>
          <AddLoading />
        </div>
      ) : ( */}
        <figure className={`container-avatar-active ${isActive ? 'active' : 'inactive'}`}>
        <img src={user.avatar || defaultAvatar} alt="Avatar del usuario" className="avatar" onError={handleError} 
        loading="lazy"
        />
        </figure>
      {/* )} */}
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

