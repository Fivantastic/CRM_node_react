import joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';

// Esquema para validar el body de la petición.
export const newUserSchema = joi.object({
  name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  last_name: joi.string().min(3).max(60).optional().messages(joiErrorMessages),
  email: joi.string().email().required().messages(joiErrorMessages),
  role: joi.string().valid('salesAgent', 'deliverer', 'admin').required().messages({
    'any.required': 'El campo rol es requerido.',
    'string.empty': 'El campo rol no puede estar vacío.',
    'any.only': 'Debe ser uno de los siguientes valores: salesAgent, deliverer, admin.'
  }),
});

/* 
    Validación de la contraseña:

    Tener al menos una letra minúscula.
    Tener al menos una letra mayúscula.
    Tener al menos un número.
    Tener al menos un carácter especial.
    Tener una longitud entre 8 y 30 caracteres.
*/