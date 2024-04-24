import { selectUserByIdModel } from '../models/user/selectUserByIdModel.js';
import { error } from 'console';

export function checkAdminPrivileges(req, res, next) {

    // Asumiendo que es un usuario válido (ha superado el middleware de autenticación)

    //Extraer el id 
    const userId = req.userId;
    
    
  
    try {
        const user = selectUserByIdModel(userId)

        if (user.rol === "admin") {
            console.error(`Administrador verificado para el usuario ${user.email}`);
            return next()
        }
        throw error

    } catch (error) {
        console.error(`El usuario ${user.email} necesita privilegios de administrador para esta acción`);
        return res.status(401).json({error: 'Se requiere privilegio de administrador para esta acción'});
    }
}