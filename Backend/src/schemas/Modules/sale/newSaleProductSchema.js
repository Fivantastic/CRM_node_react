import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const newSaleProductSchema = Joi.object({
  saleProduct_id: Joi.string().required().min(36).messages(joiErrorMessages),
  customer_id: Joi.string().required().min(36).messages(joiErrorMessages),
});
