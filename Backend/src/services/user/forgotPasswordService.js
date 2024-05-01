import { selectUserByEmailModel } from "../../models/user/selectUserByEmailModel.js";
import { updateNewRegistrationCodeModel } from "../../models/user/updateNewRegistrationCodeModel.js";
import { invalidCredentials } from "../error/errorService.js";


export const forgotPasswordService = async (email) => {
    // Obtener el usuario por correo electrónico
    const user = await selectUserByEmailModel(email);

    // Validar que el usuario exista
    if (!user) {
        invalidCredentials('El usuario/email no existe');
    }

    // Generar un código de recuperación único
    const new_registration_code = crypto.randomUUID();

    // Obtener el id del usuario
    const id_user = user.id_user;

    // Actualizar el usuario con el código de recuperación
    await updateNewRegistrationCodeModel(id_user, new_registration_code);

    // Devolver el nuevo código de recuperación
    return new_registration_code;
}