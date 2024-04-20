import joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js';

// Esquema para validar el body de la petición.
export const updateUserSchema = joi.object({
  name: joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  surname: joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  email: joi.string().email().optional().messages(joiErrorMessages),
  phone: joi.number().optional().messages(joiErrorMessages),
  bio: joi.string().optional().messages(joiErrorMessages),
  avatar: joi.string().optional().messages(joiErrorMessages),
});
