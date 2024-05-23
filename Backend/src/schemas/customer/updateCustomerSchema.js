import Joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';

// Esquema para validar el body de la petición.
export const updateCustomerSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  last_name: Joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  email: Joi.string().email({ tlds: false }).optional().messages(joiErrorMessages),
  phone: Joi.string().min(9).max(30).optional().messages(joiErrorMessages),
  company_name: Joi.string().max(30).optional().messages(joiErrorMessages),
  NIF: Joi.string().optional().messages(joiErrorMessages),
  address: Joi.string().optional().messages(joiErrorMessages),
  number: Joi.string().optional().messages(joiErrorMessages),
  city: Joi.string().optional().messages(joiErrorMessages),
  zip_code: Joi.string().optional().messages(joiErrorMessages),
  country: Joi.string().optional().messages(joiErrorMessages),
});
