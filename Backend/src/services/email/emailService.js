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
    // Configurar el mensaje de correo electrónico
    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER,
      to: email,
      subject: 'Cambio de contraseña',
      html: `<p>Tu cuenta a sido verificada</p>
             <p>Procede a cambiar tu contraseña, por favor haz clic en el siguiente enlace:</p>
             <a href="${registration_code}">Cambio de contraseña</a>`,
  };
        // Enviar el correo electrónico
      await transporter.sendMail(mailOptions);

  } 
  catch (error) {
    console.error('Error al enviar el correo electrónico de recuperar contrasena:', error);
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