import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../env.js';

//Middleware de verificacion de autenitficacion de usuarios
export function authenticateUser(req, res, next) {
    
    //Extraer el token de la solicitud
    const {authorization} = req.headers;

    // Verifica si se proporciono un token
    if (!authorization) {
        return res.status(401).json({msg: 'No se proporcionó token de autenticación'});
    }

    try {
        //Verifica el token
        const decodedToken = jwt.verify(authorization, JWT_SECRET);

        //Si el token es valido, añadir el id de usuario decodificado a la solicitud
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({error: 'Token de autentificación inválido'});
    }
}
