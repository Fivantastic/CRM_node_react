import Joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js';

// Esquema para validar solicitudes de cambio de contraseña
export const newVisitSchema = Joi.object({
    id_customer: Joi.string().guid().required().messages(joiErrorMessages), // ID del cliente
    visit_date: Joi.date().required().messages(joiErrorMessages), // Fecha de la visita
    observations: Joi.string().optional().messages(joiErrorMessages), // Observación de la visita
});

// Esquema para validar solicitudes de cambio de contraseña
export const updateVisitSchema = Joi.object({
    id_customer: Joi.string().guid().optional().messages(joiErrorMessages), // ID del cliente
    id_user: Joi.string().guid().optional().messages(joiErrorMessages), // ID del usuario
    visit_date: Joi.date().required().messages(joiErrorMessages), // Fecha de la visita
    observations: Joi.string().optional().messages(joiErrorMessages), // Observación de la visita
});