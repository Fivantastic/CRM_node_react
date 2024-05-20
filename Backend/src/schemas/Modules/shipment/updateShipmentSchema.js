import joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

export const updateShipmentSchema = joi.object({
  shipment_status: joi.string().valid('pending', 'inTransit', 'delivered', 'delayed', 'cancelled').required().messages(joiErrorMessages),
});
