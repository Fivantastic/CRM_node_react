import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

// Esquema para validar la creacion de pagos
export const newPaymentSchema = Joi.object({
    invoice_id: Joi.string().guid().required().messages(joiErrorMessages), 
    payment_date: Joi.date().optional().messages(joiErrorMessages),
});

export const cancelPaymentSchema = Joi.object({
    payment_id: Joi.string().guid().required().messages(joiErrorMessages), 
    new_status: Joi.string().valid('pending', 'cancelled', 'paid').required().messages({'any.only': 'Introduce un estado válido (pending, cancelled, paid)' }),
});