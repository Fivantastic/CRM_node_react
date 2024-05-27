import { updatePasswordService } from "../../services/user/updatePasswordService.js";
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { changeResetPasswordSchema } from "../../schemas/user/changeResetPasswordSchema.js";
import { success } from "../../utils/success.js";

export const resetPasswordController = async (req, res, next) => {
    try {
        // Validar el esquema del cuerpo de la solicitud
        await validateSchemaUtil(changeResetPasswordSchema, req.body);   
        
        const registration_code = decodeURIComponent(req.params.registration_code);

        // Actualizar la contraseña en la base de datos
        const response = await updatePasswordService(registration_code, req.body);

        // Responder al cliente
        res.json(success(response));
    } catch (error) {
        next(error);
    }
};
