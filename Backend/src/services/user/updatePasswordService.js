import bcrypt from 'bcrypt';
import { invalidCredentials } from "../error/errorService.js";
import { updatePasswordModel } from "../../models/user/updatePasswordModel.js";


export const updatePasswordService = async (id_user, newPassword) => {
    try {
        if (!id_user) throw invalidCredentials('Usuario no encontrado');

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Actualizar la contraseña en la base de datos
        await updatePasswordModel(id_user, hashedPassword);
    } catch (error) {
        // Manejar el error aquí.
        console.error('Error al cambiar la contraseña:', error);
        throw error;
    }
} 