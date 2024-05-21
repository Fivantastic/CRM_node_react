import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { recoveryPasswordSchema } from '../../schemas/user/recoveryPasswordSchema.js'; 
import { serverError } from '../../services/error/errorService.js';
import { forgotPasswordService } from '../../services/user/forgotPasswordService.js';
import { success } from '../../utils/success.js';
import { sendRecoveryPaswordEmail } from '../../services/email/emailService.js';

export const forgotPasswordController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(recoveryPasswordSchema, req.body);

    const { email } = req.body;

    //! Comentado para evitar envío de correos electrónicos luego remplazar el de abajo
    const new_registration_code = await forgotPasswordService(email);

    //! Comentado para evitar envío de correos electrónicos
    // Enviar correo electrónico de cambio de contraseña
    await sendRecoveryPaswordEmail(email, new_registration_code);
    
    // Devolvemos el usuario actualizado.
    res.status(200).send(success({message: 'Correo enviado'}));
  } catch (error) {
    return next(serverError(error.message)); // Manejo de errores
  }
};
