import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const newSaleProductSchema = Joi.object({
  user_id: Joi.string().required().messages(joiErrorMessages),
  saleProdut_id: Joi.string().required().messages(joiErrorMessages),
  customer_id: Joi.string().required().messages(joiErrorMessages),
});
