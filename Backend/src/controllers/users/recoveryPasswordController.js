import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { recoveryPasswordSchema } from '../../schemas/recoveryPasswordSchema.js'; 
import { serverError } from '../../services/errorService.js';
import { recoveryPasswordService } from '../../services/recoveryPasswordService.js';
import { sendRecoveryPaswordEmail } from '../../services/emailService.js';

export const recoveryPasswordController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(recoveryPasswordSchema, req.body);
    console.log('Ha pasado el esquema');

    const { email } = req.body;

    console.log('Email:', email);

    const new_registration_code = await recoveryPasswordService(email);

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
