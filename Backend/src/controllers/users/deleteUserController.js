import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { deleteUserModel } from "../../models/user/deleteUserModel.js";
import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";
import { deleteUserSchema } from "../../schemas/user/updateUserSchema.js";


export const deleteUserController = async (req, res, next) => {
    try {
        // Validar el body con Joi.
        await validateSchemaUtil(deleteUserSchema, req.body);

        const user_id = req.body.id_user;

        // Verificación de la existencia del usuario
        const existingUser = await selectUserByIdModel(user_id);
        if (user_id !== existingUser.id_user) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }

        // Paso 4: Eliminación del usuario
        await deleteUserModel(user_id);

        // Envía una respuesta de éxito
        res.status(200).json({ message: 'El usuario ha sido eliminado correctamente' });
    } catch (error) {
        // Manejo de errores
        next(error);
    }
};