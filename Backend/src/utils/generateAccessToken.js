import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../env.js';

// Función para generar un token de acceso
export function generateAccessToken(user) {
    return jwt.sign(
      {
        id_user: user.id_user,
        name: user.name,
        lastName : user.last_name,
        role: user.role,
        avatar: user.avatar
      },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
  }

