import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { deleteUserModel } from "../../models/user/deleteUserModel.js";
import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";
import { deleteUserSchema } from "../../schemas/user/updateUserSchema.js";
import { success } from "../../utils/success.js";
import { selectModulesByUserIdModel } from "../../models/user/selectModulesByUserIdModel.js";
import { moduleAssignedError } from "../../services/error/errorService.js";


export const deleteUserController = async (req, res, next) => {
    try {
        // Validar el body con Joi.
        await validateSchemaUtil(deleteUserSchema, req.params);

        const user_id = req.params.id_user;

        // Verificación de la existencia del usuario
        const existingUser = await selectUserByIdModel(user_id);
        if (user_id !== existingUser.id_user) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }

        // Verificamos si el usuario no tiene modulos asignados
        const userModules = await selectModulesByUserIdModel(user_id);
        if (userModules.length > 0) {
            moduleAssignedError();
        }


        // Paso 4: Eliminación del usuario
        await deleteUserModel(user_id);

        // Envía una respuesta de éxito
        res.send(success({ message: 'Usuario eliminado correctamente' }));
    } catch (error) {
        // Manejo de errores
        next(error);
    }
};