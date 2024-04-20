import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { sendWelcomeEmail } from '../services/emailService.js';
import { loginUserControllers } from '../controllers/users/loginUserControllers.js';



export const authRouter = Router();

authRouter.post("/login", authenticateUser, loginUserControllers);

authRouter.post("/validate", authenticateUser, async (req, res, next) => {
    try {
        // Extraer el correo electrónico y el enlace de validación del cuerpo de la solicitud
        const { email, registration_code } = req.body;

        // Validar que el correo electrónico y el enlace de validación estén presentes y en el formato correcto
        if (!email || !registration_code) {
            throw new Error('El correo electrónico y el enlace de validación son obligatorios.');
        }

        // Enviar correo electrónico de bienvenida
        await sendWelcomeEmail(email, registration_code);

        // Responder al cliente con un mensaje de éxito
        res.json({ message: 'Correo de bienvenida enviado correctamente.' });
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud.' });
    }
});
