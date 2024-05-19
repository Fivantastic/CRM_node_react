import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

export const createDeliveryNoteSchema = Joi.object({
  ref_SL: Joi.string().required(),
  deliverer_id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).allow(null, ''), // Hacer opcional
}).messages(joiErrorMessages);
