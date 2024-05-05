import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../env.js';

// Función para generar un token de acceso
export function generateAccessToken(user) {
  return jwt.sign(
    {
      id_user: user.id_user,
      name: user.name,
      role: user.role,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
}
