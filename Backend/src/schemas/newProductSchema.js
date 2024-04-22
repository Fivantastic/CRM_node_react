import joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js';

export const newProductSchema = joi.object({
    name: joi.string().min(3).max(30).optional().messages(joiErrorMessages),
    description: joi.string().optional().messages(joiErrorMessages),
    price: joi.string().optional().messages(joiErrorMessages),
    stock: joi.string().min(1).max(10).optional().messages(joiErrorMessages),
    product_status: joi.string().min(3).max(9).optional().messages(joiErrorMessages),
    role: joi.string().valid('admin').optional().messages({
        'any.only': 'Debe de ser solo el siguiente valor: Admin.'
    }),
});