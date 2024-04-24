import Joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js'; // Mensajes personalizados de error

export const createDeliveryNoteSchema = Joi.object({
  sale_id: Joi.string().guid().required(), // ID de la venta asociada
  deliverer_id: Joi.string().guid().required(), // ID del repartidor
  delivery_status: Joi.string().valid('pending', 'delivered').required(), // Estado de la entrega
  address_id: Joi.string().guid().required(), // ID de la dirección
  product_id: Joi.string().guid() // Para el producto asociado, puede ser opcional
}).messages(joiErrorMessages);
