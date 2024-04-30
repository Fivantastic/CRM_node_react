import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

// Esquema para validar la creacion de pagos
export const newPaymentSchema = Joi.object({
    invoice_id: Joi.string().guid().required().messages(joiErrorMessages), 
    amount: Joi.number().required().min(1).max(100000).messages(joiErrorMessages),
    // payment_status: Joi.string().valid('pending', 'cancelled', 'paid').optional().messages(joiErrorMessages),
    payment_date: Joi.date().optional().messages(joiErrorMessages),
});
