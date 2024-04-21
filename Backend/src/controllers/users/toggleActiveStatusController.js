import { toggleActivationService } from "../../services/toggleActivationService.js";

export const toggleActiveStatusController = async (req, res, next) => {

    try {
        // Obtenemos el id del usuario.
        const userId =  req.params.id_user;

        // Desactivamos al usuario en la base de datos.
        const user = await toggleActivationService(userId)

        // Devolvemos el usuario actualizado.
        res.send({
            status: 'ok',
            message: `Estado del usuario cambiado a: ${user.active === 1 ? 'Activo' : 'Inactivo'}`,
            data: { user },
        });
    } catch (error) {
        next(error);
    }
}