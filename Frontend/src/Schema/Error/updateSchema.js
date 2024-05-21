import Joi from 'joi';
import { joiErrorMessages } from './JoiErrorMesasage.js';

// Esquema para la actualización de visitas
export const updateUserSchema = Joi.object({
  id_customer: Joi.string().guid().optional().messages(joiErrorMessages),
  id_user: Joi.string().guid().optional().messages(joiErrorMessages),
  visit_date: Joi.date().optional().messages(joiErrorMessages),
  observations: Joi.string().optional().messages(joiErrorMessages),
});

export  const updateCustomerSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  email: Joi.string().email({ tlds: false }).optional().messages(joiErrorMessages),
  phone: Joi.string().min(9).max(30).optional().messages(joiErrorMessages),
  company_name: Joi.string().min(0).max(30).optional().messages(joiErrorMessages),
  NIF: Joi.string().optional().messages(joiErrorMessages),
});

export const updateVisitSchema = Joi.object({
  id_user: Joi.string().guid().optional().messages(joiErrorMessages),
  visit_date: Joi.date().optional().messages(joiErrorMessages),
  observations: Joi.string().optional().messages(joiErrorMessages),
});
