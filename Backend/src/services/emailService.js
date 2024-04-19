import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: 'cc25d8a2e4bf4d',
        pass: 'fbe31281af2815',
    },
});

export async function sendWelcomeEmail(email, validationLink) {
    try {
      // Configurar el mensaje de correo electrónico
      const mailOptions = {
        from: 'admin@cosmic.com',
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