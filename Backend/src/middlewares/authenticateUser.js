import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../env.js';
import { selectUserByIdModel } from '../models/user/selectUserByIdModel.js';


//Middleware de verificacion de autenitficacion de usuarios
export const authenticateUser = async (req, res, next) => {
    try {
    // SIN COOKIES - Extraer el token de la solicitud
    const {authorization} = req.headers;

    // CON COOKIES - Extrar el token de la solicitud
    // const authorization = req.cookies.token

    // Verifica si se proporciono un token
    if (!authorization) {
        return res.status(401).json({msg: 'No se proporcionó token de autenticación'});
    }

    //Verifica el token
    const decodedToken = jwt.verify(authorization, JWT_SECRET);

    //Si el token es valido, añadir el id de usuario decodificado a la solicitud
    req.userId = decodedToken.id_user
    req.user = decodedToken;

    // Verifica si el usuario existe en la base de datos
    const user = await selectUserByIdModel(req.userId);
    if (!user) return res.status(401).json({msg: 'Token de autentificación inválido'});
    

    next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: 'Token de autentificación inválido'});
    }
}
