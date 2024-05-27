import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const updateSaleProductSchema = Joi.object({
  quantity: Joi.string().optional().messages(joiErrorMessages),
  customer: Joi.string().optional().messages(joiErrorMessages),
});
