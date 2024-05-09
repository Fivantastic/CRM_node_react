import jwtDecode from 'jwt-decode';

export const extractUserInfoFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const { name, role, avatar } = decodedToken; 
    return { name, role, avatar };
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};
