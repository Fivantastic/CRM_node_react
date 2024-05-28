import { useUser } from "../../../context/authContext.jsx";
import { ButtonMoreUserActions } from "../../buttons/Profile/ButtonMoreUserActions.jsx";
import { ProfileButton } from "./ProfileButton.jsx";
import { DeleteGenericModal } from "../../forms/DeleteGenericModal.jsx";
import './UserListTable.css';

export const UserListTable = ({ user, activeUser, onDelete }) => {
    const token = useUser();
    const userData = user;

    // Obtener el rol traducido
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
    }

    return (
        <section id="user_table" className="userTable">
            <div className="userTableHead">
                <div className="userTableHeadRowName">Nombre y Apellidos</div>
                <div className="userTableHeadRowRole">Rol</div>
                <div className="userTableHeadRowActive">Estado</div>
                <div className="userTableHeadRowActions">Acciones</div>
            </div>
            <div className="userTableBody">
                {userData && userData.length > 0 ? (userData.map((userData) => (
                    <div key={userData.id_user} className="userTableBodyRow">
                        <div className="userTableBodyRowName">{`${userData.name} ${userData.last_name}`}</div>
                        <div className="userTableBodyRowRole">{traducirRole(userData.role)}</div>
                        <div id="userTableBodyRowActive" className={`userTableBodyRow ${userData.active ? 'active' : 'inactive'}`}>{userData.active ? 'Activo' : 'Inactivo'}</div>
                        <div className="userTableBodyRowActions">
                            <ProfileButton userData={userData} isActive={userData.active} />
                            <ButtonMoreUserActions id={userData.id_user} activeUser={activeUser} isActive={userData.active} token={token} />
                            <DeleteGenericModal id={userData.id_user} onDelete={onDelete} token={token} typeModule="user" typeModuleMessage="Usuario" />
                        </div>
                    </div>
                ))
                ) : (
                 <div className='noResult'>No hay usuarios disponibles</div>
              )}
            </div>
        </section>
    );
};
