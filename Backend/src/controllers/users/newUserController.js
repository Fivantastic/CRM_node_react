import { newUserSchema } from '../../schemas/newUserSchema.js';
import { insertUserService } from '../../services/insertUserService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newUserController = async (req, res, next) => {
  try {
    // Obtenemos el cuerpo de la petición
    const { name, surname, email, role } = req.body;

    // Validamos el body
    await validateSchemaUtil(newUserSchema, req.body);
    console.log('Ha pasado el esquema');

    // Insertamos el usuario en la base de datos
    await insertUserService(name, surname, email, role);
    console.log('Usuario insertado');
  } 
  catch (error) {
    error.statusCode = 401
    error.code = 'NEW_USER_ERROR'
    error.message = error.message || 'Error de registro'
    next(error);
  }
};
