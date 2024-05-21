import bcrypt from 'bcrypt';
import { invalidCredentials } from "../error/errorService.js";
import { updatePasswordModel } from "../../models/user/updatePasswordModel.js";
import { selectIdByRegistrationCode } from '../../models/user/selectIdByRegistrationCodeModel.js';

export const updatePasswordService = async (registration_code, body) => {
    // Obtenemos el usuario y el código de registro
    const user = await selectIdByRegistrationCode(registration_code);
    console.log(`Usuario encontrado: ${JSON.stringify(user)}`);

    // Verificar que el usuario exista
    if (!user) {
        invalidCredentials('El usuario no existe');
    }

    // Verificar que el código de registro coincida
    if (user.registration_code !== registration_code) {
        invalidCredentials('Código de registro inválido');
    }

    // Obtenemos las nuevas contraseñas
    const { newPassword, repeatPassword } = body;
    console.log(`Nuevas contraseñas: ${newPassword}, ${repeatPassword}`);

    // Verificar que las dos contraseñas sean iguales
    if (newPassword !== repeatPassword) {
        invalidCredentials('Las contraseñas no coinciden');
    }

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    console.log(`Contraseña encriptada: ${hashedPassword}`);

    // Actualizar la contraseña en la base de datos
    const response = await updatePasswordModel(user.id_user, hashedPassword);
    console.log(`Respuesta de actualización: ${JSON.stringify(response)}`);

    return response;
};
