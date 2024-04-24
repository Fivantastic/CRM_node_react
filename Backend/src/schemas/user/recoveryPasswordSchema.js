import Joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';


// Esquema para validar solicitudes de recuperación de contraseña
export const recoveryPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages(joiErrorMessages), // Correo electrónico válido y obligatorio
});
