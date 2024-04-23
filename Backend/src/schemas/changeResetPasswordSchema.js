import Joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const changeResetPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/)
    .required()
    .messages(joiErrorMessages), 
});

