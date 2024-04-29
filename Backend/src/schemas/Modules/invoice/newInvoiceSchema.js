import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const newInvoiceSchema = Joi.object({
    sale_id: Joi.string().guid().required().messages(joiErrorMessages), 
    payment_method: Joi.string().valid('cash', 'card', 'transfer').optional().messages(joiErrorMessages),
    due_date: Joi.date().optional().messages(joiErrorMessages),
});
