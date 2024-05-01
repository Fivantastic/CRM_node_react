import joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

export const newShipmentSchema = joi.object({
  customer_id: joi.string().required().max(36).messages(joiErrorMessages),
  address_id: joi.string().required().max(36).messages(joiErrorMessages),
  deliveryNote_id: joi.string().max(36).required().messages(joiErrorMessages),
  additional_notes: joi.string().required().messages(joiErrorMessages),
});
