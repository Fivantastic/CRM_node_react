import nodemailer from 'nodemailer';
import { MAIL_TRAP_HOST, MAIL_TRAP_PORT, MAIL_TRAP_AUTH_USER, MAIL_TRAP_AUTH_PASS } from '../../../env.js';

const transporter = nodemailer.createTransport({
    host: MAIL_TRAP_HOST,
    port: MAIL_TRAP_PORT,
    auth: {
        user: MAIL_TRAP_AUTH_USER,
        pass: MAIL_TRAP_AUTH_PASS,
    },
});

export async function sendWelcomeEmail(name, last_name, random_password, email, registration_code) {
    try {
      // Configurar el mensaje de correo electrónico
      const mailOptions = {
        from: MAIL_TRAP_AUTH_USER,
        to: email,
        subject: '¡Bienvenido a Nuestra Plataforma!',
        html: `<p>Bienvenido a nuestra plataforma, ${name} ${last_name}.</p>
               <p>Tu datos de usuario son:</p>
               <p><span>Usuario:</span> ${email}</p>
               <p><span>Contraseña provisional:</span> ${random_password}.</p>
               <p>Para validar tu cuenta, por favor haz clic en el siguiente enlace:</p>
               <a href="${registration_code}">Validar Cuenta</a>`,
    };
          // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

    } 
    catch (error) {
      console.error('Error al enviar el correo electrónico de bienvenida:', error);
      throw error; // Manejar el error adecuadamente en tu aplicación
    }
}

export async function sendRecoveryPaswordEmail(email, registration_code) {
  try {
    // Construir la URL de restablecimiento de contraseña con el código de registro como parámetro de consulta
    const resetPasswordURL = `http://localhost:5173/user/reset-password/${registration_code}`;

    // Configurar el mensaje de correo electrónico
    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER,
      to: email,
      subject: 'Cambio de contraseña',
      html: `<p>Tu cuenta ha sido verificada.</p>
             <p>Procede a cambiar tu contraseña, por favor haz clic en el siguiente enlace:</p>
             <a href="${resetPasswordURL}">Cambio de contraseña</a>`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo electrónico de recuperar contraseña:', error);
    throw error; // Manejar el error adecuadamente en tu aplicación
  }
}


export async function sendConfirmationVisitEmail(name, email, visit_date) {
  try {
    // Configurar el mensaje de correo electrónico
    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER,
      to: email,
      subject: 'Visita a programada ',
      html: `<p>Estimado ${name},</p>
             <p>Como hemos confirmado nuestra visita a programada el dia ${visit_date}.</p>
             <p>Si tiene alguna duda, por favor no dude en contactarnos.</p>
             `,
  };
        // Enviar el correo electrónico
      await transporter.sendMail(mailOptions);

  } 
  catch (error) {
    console.error('Error al enviar el correo electrónico de visita:', error);
    throw error; 
  }
}

export const sendEmailForVisitFeedback = async (visitId, email) => {
  try {
    // Construir la URL de valoración con el ID de la visita
    const feedbackUrl = `www.localhost:3000/NuestraURL/${visitId}`;

    // Configurar el mensaje de correo electrónico
    const mailOptions = {
        from: MAIL_TRAP_AUTH_USER,
        to: email,
        subject: 'Solicitud de valoración de la visita',
        html: `¡Hola! Nos encantaría saber tu opinión sobre tu reciente visita. Por favor, <a href="${feedbackUrl}">haz clic aquí</a> para dejar tus comentarios. ¡Gracias!`
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
      console.error('Error al enviar el correo electrónico de solicitud de valoración:', error);
      throw error;
  }
}