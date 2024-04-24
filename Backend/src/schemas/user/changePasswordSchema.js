import Joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(), // La contraseña actual es obligatoria
  newPassword: Joi.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/)
    .required()
    .messages(joiErrorMessages), 
});
