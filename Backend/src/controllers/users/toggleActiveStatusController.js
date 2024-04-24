import chalk from "chalk";
import { toggleActivationService } from "../../services/user/toggleActivationService.js";

export const toggleActiveStatusController = async (req, res, next) => {

    try {
        // Obtenemos el id del usuario.
        const userId =  req.user.id_user;
        
        // Desactivamos al usuario en la base de datos.
        const user = await toggleActivationService(userId)

        // Devolvemos el usuario actualizado.
        const isActive = user.active === 1 ? true : false
        const message = `Estado del usuario cambiado a: ${isActive ? 'Activo' : 'Inactivo'} `

        console.log(`${user.email}:`, isActive ? chalk.bold.green('Activo') : chalk.bold.gray('Inactivo'))
        res.send({
            status: 'ok',
            isActive,
            message,
            email: `${user.email}`
        });
    } catch (error) {
        next(error);
    }
}