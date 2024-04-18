import joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js';

// Esquema para validar el body de la petición.
export const newCustomerSchema = joi.object({
  name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi.string().email().required().messages(joiErrorMessages),
  phone: joi.number().required().messages(joiErrorMessages),
});
