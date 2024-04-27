import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const updateSaleProductSchema = Joi.object({
  user_id: Joi.string().required().messages(joiErrorMessages),
  id_sale: Joi.string().required().min(36).messages(joiErrorMessages),
  saleProduct_id: Joi.string().optional().min(36).messages(joiErrorMessages),
  customer_id: Joi.string().optional().min(36).messages(joiErrorMessages),
  operation_status: Joi.string().optional().valid('open', 'closed')
});
