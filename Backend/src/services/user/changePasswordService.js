import bcrypt from 'bcrypt';
import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";
import { updatePasswordModel } from "../../models/user/updatePasswordModel.js";
import { invalidCredentials, invalidPasswordError } from "../error/errorService.js";


export const changePasswordService = async (userId, body) => {
    //Obtenemos la contraseña actual y la nueva del body
    const { currentPassword, newPassword } = body;
    
    // Obtener usuario por ID
    const user = await selectUserByIdModel(userId);

    if (!user) {
      invalidCredentials('Usuario no encontrado');
    }

    // Verificar si la contraseña actual es correcta
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    // Verificar que la contraseña actual sea correcta
    if (!isValidPassword){
      invalidPasswordError();
    }

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Actualizar la contraseña en la base de datos
    const response = await updatePasswordModel(userId, hashedPassword);

    return response;
}