import joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

export const updateShipmentSchema = joi.object({
  customer_id: joi.string().optional().max(36).messages(joiErrorMessages),
  address: joi.string().optional().messages(joiErrorMessages),
  number: joi.string().optional().messages(joiErrorMessages),
  floor: joi.string().optional().messages(joiErrorMessages),
  letter_number: joi.string().optional().messages(joiErrorMessages),
  city: joi.string().optional().messages(joiErrorMessages),
  zip_code: joi.string().optional().messages(joiErrorMessages),
  country: joi.string().optional().messages(joiErrorMessages),
  deliveryNote_id: joi.string().max(36).optional().messages(joiErrorMessages),
  additional_notes: joi.string().optional().messages(joiErrorMessages),
});
