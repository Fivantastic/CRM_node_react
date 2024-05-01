import joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

export const closeDeliveryNoteSchema = joi.object({
  delivery_status: joi.string().required().messages(joiErrorMessages), //Estado de la entrega
});
