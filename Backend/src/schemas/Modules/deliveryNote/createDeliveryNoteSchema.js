import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

export const createDeliveryNoteSchema = Joi.object({
  id_sale: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required(),
  deliverer_id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).allow(null, ''), // Hacer opcional
}).messages(joiErrorMessages);
