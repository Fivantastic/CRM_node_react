import joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage';

export const newProductSchema = joi.object({
    name: joi.string().min(3).max(30).optional().messages(joiErrorMessages),
    description: joi.string().optional().messages(joiErrorMessages),
    price: joi.number().min(1).max(5).optional().messages(joiErrorMessages),
    stock: joi.string().min(1).max(10).optional().messages(joiErrorMessages),
    product_status: joi.string().min(3).max(9).optional().messages(joiErrorMessages),
    role: joi.string().valid('admin').required().messages({
        'any.only': 'Debe de ser solo el siguiente valor: Admin.'
    }),
    creation_at: joi.date().iso().optional().messages(joiErrorMessages),
    update_at: joi.date().iso().optional().messages(joiErrorMessages),
});