import { selectUserByEmailModel } from "../models/user/selectUserByEmailModel.js";
import { selectUserByIdModel } from "../models/user/selectUserByIdModel.js";
import { updateUserModel } from "../models/user/updateUserModel.js";
import { emailAlreadyRegisteredError } from "./errorService.js";



export const updateUserService = async (userId, body) => {
    const { name, last_name, email, phone, bio, avatar } = body;

    // Comprobar si el email ya existe.
    const existUser = await selectUserByEmailModel(email);
    if (existUser && existUser.id !== userId) {
        emailAlreadyRegisteredError();
    }
    console.log('email disponible');

    // Actualizar el usuario en la base de datos.
    await updateUserModel(userId, name, last_name, email, phone, bio, avatar );

    // Obtener el usuario actualizado.
    const user = await selectUserByIdModel(userId);

    // Devolver el usuario actualizado.
    return user;
};