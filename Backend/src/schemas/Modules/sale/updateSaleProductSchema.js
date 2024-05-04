import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const updateSaleProductSchema = Joi.object({
  id_user: Joi.string().optional().min(36).messages(joiErrorMessages),
  saleProduct_id: Joi.string().optional().min(36).messages(joiErrorMessages),
  customer_id: Joi.string().optional().min(36).messages(joiErrorMessages),
  operation_status: Joi.string().optional().messages(joiErrorMessages),
});
