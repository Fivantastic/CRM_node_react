import joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js';

// Esquema para validar el body de la petición.
export const newCustomerSchema = joi.object({
  name: joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  email: joi.string().email().optional().messages(joiErrorMessages),
  phone: joi.string().min(9).max(30).optional().messages(joiErrorMessages),
});
