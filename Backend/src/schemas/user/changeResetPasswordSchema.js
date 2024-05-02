import Joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const changeResetPasswordSchema = Joi.object({
  newPassword: Joi.string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
  .required()
  .label('Nueva contraseña')
  .messages(joiErrorMessages),
repeatPassword: Joi.string()
  .valid(Joi.ref('newPassword'))
  .required()
  .label('Repetir nueva contraseña')
  .messages(joiErrorMessages),
});

