import Joi from 'joi';
import { joiErrorMessages } from './JoiErrorMesasage.js';

// Esquema para el inicio de sesión
export const loginUserSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().label('Email').messages(joiErrorMessages),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .label('Password')
    .messages(joiErrorMessages),
  remember: Joi.boolean().optional().label('Remember').messages(joiErrorMessages),
});

// Esquema para la recuperación de contraseña
export const forgotPasswordUserSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().label('Email').messages(joiErrorMessages),
});

// Esquema para el restablecimiento de contraseña
export const resetPasswordUserSchema = Joi.object({
  newPassword: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .label('Nueva contraseña')
    .messages({
      ...joiErrorMessages,
      'string.pattern.base': 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
    }),
  repeatPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .label('Repetir nueva contraseña')
    .messages({
      ...joiErrorMessages,
      'any.only': 'Las contraseñas no coinciden',
    }),
});
