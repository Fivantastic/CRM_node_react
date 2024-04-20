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

    const registration_code = crypto.randomUUID();

    // Insertamos el usuario en la base de datos
    await insertUserService(name, surname, email, role, registration_code);
    console.log('Usuario insertado');

    // Respondemos al usuario
    res.status(201).send({
      status: 'ok',
      message: 'El usuario ha sido creado, a la espera de validación',
      data: { registration_code }
    });
  } 
  catch (error) {
    error.statusCode = 401
    error.code = 'NEW_USER_ERROR'
    error.message = error.message || 'Error de registro'
    next(error);
  }
};
