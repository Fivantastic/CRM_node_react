import nodemailer from 'nodemailer';
import { MAIL_TRAP_HOST, MAIL_TRAP_PORT, MAIL_TRAP_AUTH_USER, MAIL_TRAP_AUTH_PASS } from '../../env.js';

const transporter = nodemailer.createTransport({
    host: MAIL_TRAP_HOST,
    port: MAIL_TRAP_PORT,
    auth: {
        user: MAIL_TRAP_AUTH_USER,
        pass: MAIL_TRAP_AUTH_PASS,
    },
});

export async function sendWelcomeEmail(email, validationLink) {
    try {
      // Configurar el mensaje de correo electrónico
      const mailOptions = {
        from: 'adminPlus@cosmic.com',
        to: email,
        subject: '¡Bienvenido a nuestra plataforma!',
        html: `<p>Bienvenido a nuestra plataforma. Para validar tu cuenta, por favor haz clic en el siguiente enlace:</p>
               <a href="${validationLink}">Validar cuenta</a>`,
        };
          // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error('Error al enviar el correo electrónico de bienvenida:', error);
    throw error; // Manejar el error adecuadamente en tu aplicación
  }
}