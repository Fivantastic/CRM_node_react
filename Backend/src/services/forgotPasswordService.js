import { selectUserByEmailModel } from "../models/user/selectUserByEmailModel.js";
import { updateNewRegistrationCodeModel } from "../models/user/updateNewRegistrationCodeModel.js";
import { invalidCredentials } from "./errorService.js";


export const forgotPasswordService = async (email) => {
    // Obtener el usuario por correo electrónico
    const user = await selectUserByEmailModel(email);


    if (!user) throw invalidCredentials('El usuario/email no existe');

    console.log('Ha pasada credenciales validas');

    // Generar un código de recuperación único
    const new_registration_code = crypto.randomUUID();

    const id_user = user.id_user;

    console.log('id_user:', id_user);

    console.log('se ha generado un nuevo código de recuperación', new_registration_code);

    // Actualizar el usuario con el código de recuperación
    await updateNewRegistrationCodeModel(id_user, new_registration_code);

    console.log('Código de recuperación actualizado');

    return new_registration_code;
}