import Joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js';

export const closeDeliveryNoteSchema = joi.object({
  delivery_status: Joi.string().required().messages(joiErrorMessages), //Estado de la entrega
});
