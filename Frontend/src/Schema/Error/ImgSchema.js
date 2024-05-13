import Joi from 'joi';
import { joiErrorMessages } from './JoiErrorMesasage.js';

export const imgSchema = Joi.object({
  name: Joi.string().required().messages(joiErrorMessages),
  mimetype: Joi.string()
    .valid('image/jpeg', 'image/png')
    .required()
    .messages(joiErrorMessages),
  size: Joi.number().max(5000000).required().messages(joiErrorMessages),
}).unknown(true);
