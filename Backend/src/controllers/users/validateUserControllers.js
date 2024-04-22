import { findByRegistrationCodeModel } from "../../models/user/findByRegistrationCodeModel.js";
import { updateUserActiveModel } from "../../models/user/updateUserActiveModel.js";

export const validateUserController = async (req, res, next) => {
    try {
        // Obtener el código de registro de la URL
        const { registration_code } = req.params;

        const userid = await findByRegistrationCodeModel(registration_code);

        const { id_user } = userid;

        // Actualizar el estado de activación del usuario
        await updateUserActiveModel(id_user);

        res.status(201).send({
            message: 'El usuario ha sido validado exitosamente',
          });
    } catch (error) {
        next(error);

    }
};