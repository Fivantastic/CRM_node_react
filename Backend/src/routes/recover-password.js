import express from 'express';
import { v4 as uuidv4 } from 'uuid'; // Renombrando la función v4 como uuidv4
// import nodemailer from 'nodemailer'; // Comentado temporalmente
import { check, validationResult } from 'express-validator';
import { User } from '../models/customer/user.js'; // Importando el modelo de usuario

const router = express.Router();

// Endpoint para solicitud de recuperación de contraseña
router.post('/reset-password-request', [
    // Validar el correo electrónico
    check('email').isEmail().withMessage('El correo electrónico no es válido'),
], async (req, res) => {
    // Comprobar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Verificar si el usuario existe en la base de datos
    const { email } = req.body;
    let user;
    try {
        user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ msg: 'El correo electrónico no está asociado a ninguna cuenta' });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Error del servidor');
    }

    // Generar un código de registro único
    const registrationCode = uuidv4(); // Utilizando la función uuidv4

    // Actualizar el código de registro del usuario en la base de datos
    try {
        await User.updateByEmail(email, { registration_code: registrationCode });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Error del servidor');
    }

    // Enviar un correo electrónico con el enlace de recuperación de contraseña
    // const transporter = nodemailer.createTransport({
    //     // Configuración del servidor de correo saliente (SMTP)
        
    // });

    // const mailOptions = {
    //     from: 'tu_correo@gmail.com',
    //     to: email,
    //     subject: 'Recuperación de Contraseña',
    //     text: `Por favor, haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:3000/reset-password/${registrationCode}`,
    // };

    // transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send('Error del servidor');
    //     } else {
    //         console.log('Correo electrónico enviado: ' + info.response);
    //         return res.status(200).json({ msg: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña' });
    //     }
    // });

    // Temporalmente retornamos una respuesta de éxito sin enviar correo electrónico
    return res.status(200).json({ msg: 'Se ha generado un código de registro para restablecer la contraseña' });
});

export default router;
