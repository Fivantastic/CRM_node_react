import joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';

export const loginUserSchema = joi.object({
  email: joi.string().email().required().messages(joiErrorMessages),
  password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/).required().messages(joiErrorMessages),
  remember: joi.boolean().optional().messages(joiErrorMessages),
});
