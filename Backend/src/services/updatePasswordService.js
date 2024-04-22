import bcrypt from 'bcrypt';
import { validateSchemaUtil } from "../utils/validateSchemaUtil.js";
import { changePasswordSchema } from "../schemas/changePasswordSchema.js";
import { invalidCredentials } from "./errorService.js";
import { updatePasswordModel } from "../models/user/updatePasswordModel.js";


export const updatePasswordService = async (id_user, body) => {
    try {
        if (!id_user) throw invalidCredentials('Usuario no encontrado');
        
        const { newPassword } = body;

        // Validar el esquema del cuerpo de la solicitud
        await validateSchemaUtil(changePasswordSchema, body);        

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Actualizar la contraseña en la base de datos
        await updatePasswordModel(id_user, hashedPassword);
    } catch (error) {
        next(error);
    }
} 