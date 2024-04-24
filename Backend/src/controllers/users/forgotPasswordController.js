import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { recoveryPasswordSchema } from '../../schemas/user/recoveryPasswordSchema.js'; 
import { serverError } from '../../services/error/errorService.js';
import { forgotPasswordService } from '../../services/user/forgotPasswordService.js';
// import { sendRecoveryPaswordEmail } from '../../services/email/emailService.js';

export const forgotPasswordController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(recoveryPasswordSchema, req.body);
    console.log('Ha pasado el esquema');

    const { email } = req.body;

    console.log('Email:', email);

    const new_registration_code = await forgotPasswordService(email);

    console.log('New registration code en recoveryPasswordController:', new_registration_code);

    //! Comentado para evitar envío de correos electrónicos
    // Enviar correo electrónico de cambio de contraseña
    // await sendRecoveryPaswordEmail(email, new_registration_code);

    // console.log('Correo enviado');
    
    // Devolvemos el usuario actualizado.
    res.send({
      status: 'ok',
      message: 'Email enviado de cambio de contraseña'
    });
  } catch (error) {
    return next(serverError(error.message)); // Manejo de errores
  }
};
