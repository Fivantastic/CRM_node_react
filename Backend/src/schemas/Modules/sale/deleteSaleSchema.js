import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const deleteSaleSchema = Joi.object({
  user_id: Joi.string().required().min(36).messages(joiErrorMessages),
  id_sale: Joi.string().required().min(36).messages(joiErrorMessages)
});
