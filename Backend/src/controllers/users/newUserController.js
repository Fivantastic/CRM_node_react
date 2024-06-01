import { newUserSchema } from '../../schemas/user/newUserSchema.js';
import { insertUserService } from '../../services/user/insertUserService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newUserController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newUserSchema, req.body);

    // Insertamos el usuario en la base de datos
    await insertUserService(req.body);

    // Respondemos al usuario
    res.status(201).send({
      status: 'ok',
      message: 'El usuario ha sido creado, a la espera de validación',
    });
  } catch (error) {
    next({
      statusCode: error.statusCode || 401,
      code: error.code || 'NEW_USER_ERROR',
      message: error.message || 'Error de registro de usuario',
    });
  }
};