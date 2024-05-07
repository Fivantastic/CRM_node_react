import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const newSaleProductSchema = Joi.object({
  product: Joi.string().required().messages(joiErrorMessages),
  quantity: Joi.string().required().messages(joiErrorMessages),
  customer: Joi.string().required().messages(joiErrorMessages),
});
