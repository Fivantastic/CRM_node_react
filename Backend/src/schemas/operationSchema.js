import Joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js'; // Mensajes personalizados de error

// Esquema para validar la creación de operaciones
export const createOperationSchema = Joi.object({
  user_id: Joi.string().guid().required(), // ID del usuario
  product_id: Joi.string().guid(), // ID del producto (opcional)
  service_id: Joi.string().guid(), // ID del servicio (opcional)
  customer_id: Joi.string().guid().required(), // ID del cliente
  type: Joi.string().valid('comercial', 'repartidor').required(), // Tipo de operación
  operation_status: Joi.string().valid('open', 'closed').required(), // Estado de la operación
}).messages(joiErrorMessages); // Mensajes personalizados de error
