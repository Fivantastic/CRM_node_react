import joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';
import { imgSchema } from '../error/imgSchema.js';

// Esquema para validar el body de la petición.
export const updateUserSchema = joi.object({
  name: joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  last_name: joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  email: joi.string().email().optional().messages(joiErrorMessages),
  phone: joi.number().optional().messages(joiErrorMessages),
  bio: joi.string().optional().messages(joiErrorMessages),
  avatar: imgSchema.optional(),
});

export const deleteUserSchema = joi.object({
  id_user: joi.string().guid().required().messages(joiErrorMessages),
});
