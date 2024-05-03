import bcrypt from 'bcrypt';
import { invalidCredentials } from "../error/errorService.js";
import { updatePasswordModel } from "../../models/user/updatePasswordModel.js";
import { selectIdByRegistrationCode } from '../../models/user/selectIdByRegistrationCodeModel.js';


export const updatePasswordService = async (registration_code, body) => {
    // Obtenemos el nuevo password
    const { newPassword, repeatPassword } = body;

    // Verificar que las dos passwords sean iguales
    if (newPassword !== repeatPassword) {
        invalidCredentials('Las dos passwords no coinciden');
    }

    // Obtenemos el id del usuario
    const id_user = await selectIdByRegistrationCode(registration_code);

        
    // Verificar que el usuario exista
    if (!id_user) {
        invalidCredentials(`El usuario no existe`);
    }

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Actualizar la contraseña en la base de datos
    const response = await updatePasswordModel(id_user, hashedPassword);

    return response;
} 