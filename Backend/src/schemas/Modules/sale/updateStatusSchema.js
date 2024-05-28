import { joiErrorMessages } from '../../error/joiErrorMessage.js';
import Joi from 'joi';

export const updateStatusSchema = Joi.object({
  id: Joi.string().required().min(36).messages(joiErrorMessages),
  newStatus: Joi.string().required().valid('open', 'processing', 'cancelled', 'closed').messages(joiErrorMessages),
});
