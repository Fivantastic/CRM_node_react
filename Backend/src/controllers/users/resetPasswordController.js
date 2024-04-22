import { findByRegistrationCodeModel } from "../../models/user/findByRegistrationCodeModel.js";
import { changePasswordSchema } from "../../schemas/changePasswordSchema.js";
import { updatePasswordService } from "../../services/updatePasswordService.js";
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";

export const resetPasswordController = async (req, res, next) => {
    try {
        // Obtener el código de registro de la URL
        const registration_code = req.params.registration_code;

        const user = await findByRegistrationCodeModel(registration_code);
        
        const { id_user } = user;

        // Validar el esquema del cuerpo de la solicitud
        await validateSchemaUtil(changePasswordSchema, req.body);
        
        await updatePasswordService(id_user, req.body);

        // Responder con éxito
        res.json(success({ message: 'Contraseña cambiada con éxito' }));
        
    } catch (error) {
        next(error);
    }
}
