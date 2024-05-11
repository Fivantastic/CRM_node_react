import { jwtDecode } from 'jwt-decode';

export const getUserDataFromToken = (token) => {
  try {
    // Decodifica el token JWT
    const decodedToken = jwtDecode(token);

    // Extrae los datos necesarios
    const { avatar, name, lastName, role, id_user } = decodedToken;

    // Devuelve los datos en un objeto
    return { avatar, name, lastName, role, id_user };
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};
