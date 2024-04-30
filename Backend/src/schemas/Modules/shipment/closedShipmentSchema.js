import joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

export const closedShipmentSchema = joi.object({
  shipment_status: joi.string().required().messages(joiErrorMessages),
});
