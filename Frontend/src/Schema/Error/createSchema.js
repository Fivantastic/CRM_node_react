import Joi from 'joi';
import { joiErrorMessages } from './JoiErrorMesasage.js';

// Esquema para la creación de un nuevo usuario
export const newUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages(joiErrorMessages),
  last_name: Joi.string().min(3).max(60).optional().messages(joiErrorMessages),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages(joiErrorMessages),
  role: Joi.string().valid('salesAgent', 'deliverer', 'admin').required().messages({
    'any.required': 'El campo rol es requerido.',
    'string.empty': 'El campo rol no puede estar vacío.'
  }),
});

export const createCustomerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages(joiErrorMessages),
  last_name: Joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: Joi.string().email({ tlds: false }).required().messages(joiErrorMessages),
  phone: Joi.string().min(9).max(30).optional().messages(joiErrorMessages),
  company_name: Joi.string().min(0).max(30).optional().messages(joiErrorMessages),
  NIF: Joi.string().optional().messages(joiErrorMessages),
  address: Joi.string().optional().messages(joiErrorMessages),
  number: Joi.string().optional().messages(joiErrorMessages),
  city: Joi.string().optional().messages(joiErrorMessages),
  zip_code: Joi.string().optional().messages(joiErrorMessages),
  country: Joi.string().optional().messages(joiErrorMessages),
});

export  const newVisitSchema = Joi.object({
  id_customer: Joi.string().guid().required().messages(joiErrorMessages),
  visit_date: Joi.date().required().messages(joiErrorMessages),
  observations: Joi.string().optional().messages(joiErrorMessages),
});