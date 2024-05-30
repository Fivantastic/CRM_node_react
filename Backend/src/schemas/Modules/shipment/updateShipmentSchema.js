import joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

export const updateShipmentSchema = joi.object({
  shipment_status: joi.string().valid('pending', 'inTransit', 'delivered', 'cancelled', 'delayed', 'refused').required().messages(joiErrorMessages),
});


export const feedbackShipmentSchema = joi.object({
  rating_module: joi.number()
    .required()
    .min(1)
    .max(5)
    .messages(joiErrorMessages),
  rating_comment: joi.string().optional().messages(joiErrorMessages),
});
