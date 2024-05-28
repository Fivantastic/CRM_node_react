import Joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

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
  visit_date: Joi.date().optional().messages(joiErrorMessages), // Fecha de la visita
  observations: Joi.string().optional().messages(joiErrorMessages), // Observación de la visita
});

export const updateVisitIDSchema = Joi.object({
  visitId: Joi.string().guid().required().messages(joiErrorMessages), // ID de la visita
});

export const feedbackVisitSchema = Joi.object({
  rating_visit: Joi.number()
    .required()
    .min(1)
    .max(5)
    .messages(joiErrorMessages),
  comment_visit: Joi.string().optional().min(0).messages(joiErrorMessages),
});
