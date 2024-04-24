import joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js';

export const newProductSchema = joi.object({
    name: joi.string().required().min(3).max(30).messages(joiErrorMessages),
    description: joi.string().required().messages(joiErrorMessages),
    price: joi.string().required().messages(joiErrorMessages),
    stock: joi.number().required().min(1).max(100).messages(joiErrorMessages),
    product_status: joi.string().required().valid('active', 'inactive').messages({'any.only': 'Debe de ser uno de los siguientes valores: active, inactive.'})
});