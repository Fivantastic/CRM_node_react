// src/schemas/Modules/shipment/newShipmentSchema.js
import Joi from 'joi';

export const newShipmentSchema = Joi.object({
  deliveryNote_id: Joi.string().guid().required(),
  additional_notes: Joi.string().optional(),
});
