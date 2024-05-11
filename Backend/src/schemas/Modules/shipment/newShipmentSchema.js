import joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

export const newShipmentSchema = joi.object({
  customer_id: joi.string().required().max(36).messages(joiErrorMessages),
  address_id: joi.string().required().max(36).messages(joiErrorMessages),
  deliveryNote_id: joi.string().required().max(36).messages(joiErrorMessages),
  additional_notes: joi.string().required().messages(joiErrorMessages),
  product_name: joi.string().required().max(255).messages(joiErrorMessages),
  product_quantity: joi.number().required().messages(joiErrorMessages),
  shipment_status: joi.string().required().messages(joiErrorMessages),
}).messages({
  'string.empty': `{#label} cannot be empty`,
  'string.max': `{#label} should have a maximum length of {#limit}`,
  'number.base': `{#label} should be a number`,
  'any.required': `{#label} is a required field`
});
