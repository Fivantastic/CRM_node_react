import joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js';

name, surname, email, password, role

// Esquema para validar el body de la petición.
export const newCustomerSchema = joi.object({
  name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  surname: joi.string().min(3).max(60).required().messages(joiErrorMessages),
  email: joi.string().email().required().messages(joiErrorMessages),
  password: joi.string().min(8).max(30)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};:\'"|,.<>/?]).{8,30}$'))
    .required(),
  role: joi.string().valid('seller', 'deliverer', 'admin').required().messages(joiErrorMessages),
});

/* 
    Validación de la contraseña:

    Tener al menos una letra minúscula.
    Tener al menos una letra mayúscula.
    Tener al menos un número.
    Tener al menos un carácter especial.
    Tener una longitud entre 8 y 30 caracteres.
*/