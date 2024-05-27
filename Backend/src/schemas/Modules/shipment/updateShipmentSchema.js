import joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

export const updateShipmentSchema = joi.object({
  shipment_status: joi.string().valid('pending', 'inTransit', 'delivered', 'delayed', 'cancelled').required().messages(joiErrorMessages),
});


export const feedbackShipmentSchema = joi.object({
  rating_shipment: joi.number()
    .required()
    .min(1)
    .max(5)
    .messages(joiErrorMessages),
  comment_shipment: joi.string().optional().messages(joiErrorMessages),
});
