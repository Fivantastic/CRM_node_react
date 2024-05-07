import joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';

// Esquema para validar el body de la petición.
export const updateCustomerSchema = joi.object({
  name: joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  email: joi.string().email().optional().messages(joiErrorMessages),
  phone: joi.string().min(9).max(30).optional().messages(joiErrorMessages),
  company_name: joi
    .string()
    .min(0)
    .max(30)
    .optional()
    .messages(joiErrorMessages),
  NIF: joi.string().optional().messages(joiErrorMessages),
});
