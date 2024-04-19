import { newCustomerSchema } from '../../schemas/newCustomerSchema.js';
import { insertUserService } from '../../services/insertUserService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newCustomerControllers = async (req, res, next) => {
  try {
    // Obtenemos el cuerpo de la petición
    const { name, surname, email, password, role } = req.body;

    // Validamos el body
    await validateSchemaUtil(newCustomerSchema, req.body);

    // Insertamos el usuario en la base de datos
    await insertUserService(name, surname, email, password, role);

    // Respondemos al usuario
    res.status(201).send({
      status: 'ok',
      message: 'El usuario ha sido creado, a la espera de validación',
      
    });
  } catch (error) {
    error.code = 'NEW_USER_ERROR'
    next(error);
  }
};
