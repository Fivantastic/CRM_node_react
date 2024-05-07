import joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';

// Esquema para validar el body de la petición.
export const newCustomerSchema = joi.object({
  name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi.string().email().required().messages(joiErrorMessages),
  phone: joi.string().min(9).max(30).optional().messages(joiErrorMessages),
  company_name: joi
    .string()
    .min(0)
    .max(30)
    .optional()
    .messages(joiErrorMessages),
  NIF: joi.string().optional().messages(joiErrorMessages),
});

export const deleteCustomerSchema = joi.object({
  customerId: joi.string().guid().required().messages(joiErrorMessages),
});
