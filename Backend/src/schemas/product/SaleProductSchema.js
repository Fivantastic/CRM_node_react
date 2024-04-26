import joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';

export const SaleProductSchema = joi.object({
  quantity: joi.string().required().min(1).max(300).messages(joiErrorMessages),
  description: joi.string().required().messages(joiErrorMessages),
});
