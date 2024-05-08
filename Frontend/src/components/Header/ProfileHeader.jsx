// import { useUser } from "../../context/authContext.jsx";
import defaultAvatar from '/profile-pic.jpg'; 
// import { jwtDecode } from 'jwt-decode';
import './profileHeader.css';


export const ProfileHeader = () => {
    // const user = useUser(); // Obtener el contexto con el token

    // // Verificar si user está definido y si tiene el token
    // const token = user ? user.token : '';

    // // Decodificar el token para obtener los datos del usuario
    // let avatar = '';
    // if (token) {
    //     const decodedToken = jwtDecode(token);
    //     avatar = decodedToken.avatar; // Suponiendo que el avatar está en el token
    // }

    return (
        <> 
        <div className="profile-header">
            {/* {avatar && <img src={avatar || defaultAvatar} alt="Avatar" />}  */}
            <img src={defaultAvatar} alt="Avatar"  style={{width: '60px', height: '60px', borderRadius: '50%'}}/>
        </div>
        </>
    );
}
