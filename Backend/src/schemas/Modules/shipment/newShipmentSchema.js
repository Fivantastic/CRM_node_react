// src/schemas/Modules/shipment/newShipmentSchema.js
import Joi from 'joi';

export const newShipmentSchema = Joi.object({
  deliveryNote_id: Joi.string().guid().required(),
  shipment_status: Joi.string().valid('inTransit', 'cancelled', 'delayed', 'delivered').required(),
  additional_notes: Joi.string().allow('', null),
});
