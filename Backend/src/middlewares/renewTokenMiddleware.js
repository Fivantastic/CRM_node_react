import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../env.js';
import { selectUserByIdModel } from '../models/user/selectUserByIdModel.js';

export const renewTokenMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        // Verifica si se proporcionó un token
        if (!authorization) {
            req.user = {};
            return next();
        }

        // Verifica el token y decodifica sin importar si está expirado o no
        let decodedToken;
        try {
            decodedToken = jwt.verify(authorization, JWT_SECRET, { ignoreExpiration: true });
        } catch (error) {
            decodedToken = {};
        }

        // Añadir el contenido decodificado a la solicitud
        req.user = decodedToken;

        /* console.log('decodedToken', decodedToken);

        console.log('req.user', req.user); */

        // Si hay un ID de usuario en el token, verifica si existe en la base de datos
        if (decodedToken.id_user) {
            const user = await selectUserByIdModel(decodedToken.id_user);
            if (!user) return res.status(401).json({ msg: 'Token de autenticación inválido' });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Token de autenticación inválido' });
    }
};
