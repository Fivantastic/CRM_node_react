import { success } from "../../utils/success.js";
import { selectIdByRegistrationCode } from "../../models/user/selectIdByRegistrationCodeModel.js";
import { updatePasswordService } from "../../services/user/updatePasswordService.js";
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { changeResetPasswordSchema } from "../../schemas/user/changeResetPasswordSchema.js";

export const resetPasswordController = async (req, res, next) => {
    try {
        // Obtener el código de registro de la URL
        const new_registration_code = req.params.registration_code;
        
        // Validar el esquema del cuerpo de la solicitud
        await validateSchemaUtil(changeResetPasswordSchema, req.body);   
        
        // Obtenemos el nuevo password
        const { newPassword } = req.body;

        // Obtenemos el id del usuario
        const id_user  = await selectIdByRegistrationCode(new_registration_code);
    
        // Actualizar la contraseña en la base de datos
        await updatePasswordService(id_user , newPassword);

        // Responder con éxito
        res.json(success({ 
            message: 'Contraseña cambiada con éxito', 
            data: { 
                id_user: id_user,
                newPassword: newPassword
             }
        }));
        
    } catch (error) {
        next(error);
    }
}
