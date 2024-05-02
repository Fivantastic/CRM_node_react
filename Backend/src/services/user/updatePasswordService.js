import bcrypt from 'bcrypt';
import { invalidCredentials } from "../error/errorService.js";
import { updatePasswordModel } from "../../models/user/updatePasswordModel.js";
import { selectIdByRegistrationCode } from '../../models/user/selectIdByRegistrationCodeModel.js';


export const updatePasswordService = async (new_registration_code, body) => {
    // Obtenemos el nuevo password
    const { newPassword } = body;

    // Obtenemos el id del usuario
    const id_user  = await selectIdByRegistrationCode(new_registration_code);
        
    // Verificar que el usuario exista
    if (!id_user) {
        invalidCredentials('Usuario no encontrado');
    }

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Actualizar la contraseña en la base de datos
    const response = await updatePasswordModel(id_user, hashedPassword);

    return response;
} 