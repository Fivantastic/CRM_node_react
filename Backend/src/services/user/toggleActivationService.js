import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";
import { toggleActiveModel } from "../../models/user/toggleActiveModel.js";

export const toggleActivationService = async (userId) => {
    // Comprobar si el id existe.
    const user = await selectUserByIdModel(userId);
    // Condicional: si está activo desactivar, y viceversa
    const newStatus = user.active === 0 ? true : false

    // Actualizar el usuario en la base de datos.
    await toggleActiveModel(userId, newStatus );

    // Obtener el usuario actualizado.
    const updatedUser = await selectUserByIdModel(userId);

    // Devolver el usuario actualizado.
    return updatedUser;
};