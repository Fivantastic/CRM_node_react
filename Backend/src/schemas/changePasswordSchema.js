import Joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(), // La contraseña actual es obligatoria
  newPassword: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .messages(joiErrorMessages), // La nueva contraseña debe tener al menos 8 caracteres
});
