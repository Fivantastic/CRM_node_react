import joi from 'joi';
import { joiErrorMessages } from '../error/joiErrorMessage.js';

export const newProductSchema = joi.object({
    name: joi.string().required().min(3).max(30).messages(joiErrorMessages),
    price: joi.string().required().messages(joiErrorMessages),
    stock: joi.number().required().min(1).max(10000).messages(joiErrorMessages),
    description: joi.string().optional().messages(joiErrorMessages),
    active: joi.boolean().required().messages(joiErrorMessages),
});


export const UpdateProductSchema = joi.object({
    name: joi.string().optional().min(3).max(30).messages(joiErrorMessages),
    price: joi.string().optional().messages(joiErrorMessages),
    stock: joi.number().optional().min(1).max(10000).messages(joiErrorMessages),
    description: joi.string().optional().messages(joiErrorMessages),
});