import Joi from 'joi';

// Esquema para validar solicitudes de recuperación de contraseña
export const recoveryPasswordSchema = Joi.object({
  email: Joi.string().email().required(), // Correo electrónico válido y obligatorio
});
