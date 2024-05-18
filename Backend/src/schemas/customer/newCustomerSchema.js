import joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';

// Esquema para validar el body de la petición.
export const newCustomerSchema = joi.object({
  name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  last_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi.string().email().required().messages(joiErrorMessages),
  phone: joi.string().min(9).max(30).optional().messages(joiErrorMessages),
  company_name: joi
    .string()
    .min(0)
    .max(30)
    .optional()
    .messages(joiErrorMessages),
  NIF: joi.string().optional().messages(joiErrorMessages),
  address: joi.string().optional().messages(joiErrorMessages),
  number: joi.string().optional().messages(joiErrorMessages),
  floor: joi.string().optional().messages(joiErrorMessages),
  letter_number: joi.string().optional().messages(joiErrorMessages),
  city: joi.string().optional().messages(joiErrorMessages),
  zip_code: joi.string().optional().messages(joiErrorMessages),
  country: joi.string().optional().messages(joiErrorMessages),
});

export const deleteCustomerSchema = joi.object({
  customerId: joi.string().guid().required().messages(joiErrorMessages),
});
