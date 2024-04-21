import Joi from 'joi';

// Esquema para validar solicitudes de cambio de contraseña
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(), // La contraseña actual es obligatoria
  newPassword: Joi.string().min(8).required(), // La nueva contraseña debe tener al menos 8 caracteres
});
