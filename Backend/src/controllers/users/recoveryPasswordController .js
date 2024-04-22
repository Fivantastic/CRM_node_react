import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js'; // Validación de esquemas
import { recoveryPasswordSchema } from '../../schemas/recoveryPasswordSchema.js'; // Esquema para validar datos
import { selectUserByEmailModel } from '../../models/user/selectUserByEmailModel.js'; // Obtener usuario por correo electrónico
import { updateUserModel } from '../../models/user/updateUserModel.js'; // Actualizar usuario
// import nodemailer from 'nodemailer'; // Comentado para desactivar Nodemailer
import { success } from '../../utils/success.js';
import { serverError } from '../../services/errorService.js';

export const recoveryPasswordController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(recoveryPasswordSchema, req.body);

    const { email } = req.body;

    // Obtener el usuario por correo electrónico
    const user = await selectUserByEmailModel(email);

    if (!user) {
      return res.status(404).json({ error: 'El correo electrónico no está asociado a ninguna cuenta' });
    }

    // Generar un código de recuperación único
    const recoveryCode = crypto.randomUUID();

    // Actualizar el usuario con el código de recuperación
    await updateUserModel(user.id_user, { recovery_code: recoveryCode });

    // Comentado para evitar envío de correos electrónicos
    /*
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Servicio de correo
      auth: {
        user: 'tu_correo@gmail.com', // Correo electrónico
        pass: 'tu_contraseña', // Contraseña
      },
    });

    const mailOptions = {
      from: 'tu_correo@gmail.com',
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Por favor, haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:3000/reset-password/${recoveryCode}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return next(serverError('No se pudo enviar el correo electrónico'));
      }

      return res.status(200).json(success({ msg: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña' }));
    });
    */

    // Respuesta temporal sin envío de correos electrónicos
    return res.status(200).json(success({ msg: 'Código de recuperación generado para restablecer la contraseña' }));

  } catch (error) {
    return next(serverError(error.message)); // Manejo de errores
  }
};
