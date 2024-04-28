import joi from 'joi';
import { joiErrorMessages } from './joiErrorMessage.js';

// Esquema para validar imágenes.
// name: Es el nombre del archivo.
// mimetype: Es el tipo de archivo.
// size: Es el tamaño del archivo.
// unknown(true): Permite campos desconocidos.
export const imgSchema = joi
  .object({
    name: joi.string().required().messages(joiErrorMessages),
    mimetype: joi
      .string()
      .valid('image/jpeg', 'image/png')
      .required()
      .messages(joiErrorMessages),
    size: joi.number().max(5000000).required().messages(joiErrorMessages),
  })
  .unknown(true);
