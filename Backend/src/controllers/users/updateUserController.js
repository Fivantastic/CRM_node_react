import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { updateUserService } from "../../services/user/updateUserService.js";
import { updateUserSchema } from "../../schemas/user/updateUserSchema.js";

export const updateUserController = async (req, res, next) => {

    try {
        // Validar el body con Joi.
        await validateSchemaUtil(updateUserSchema, req.body);

        // Obtenemos el id del usuario.
        const userId =  req.user.id_user;

        // Actualizamos el usuario en la base de datos.
        const user = await updateUserService(userId, req.body);

        // Devolvemos el usuario actualizado.
        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
}
