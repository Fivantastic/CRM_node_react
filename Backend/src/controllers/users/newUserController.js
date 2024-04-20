import bcrypt from "bcrypt";
import { newUserSchema } from '../../schemas/newUserSchema.js';
import { insertUserService } from '../../services/insertUserService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { generateRandomPassword } from "../../utils/generateRandomPassword.js";

export const newUserController = async (req, res, next) => {
  try {
    // Obtenemos el cuerpo de la petición
    const { name, surname, email, role } = req.body;

    // Validamos el body
    await validateSchemaUtil(newUserSchema, req.body);
    console.log('Ha pasado el esquema');

    // Creamos una id y un código de activación para el usuario.
    const id_user = crypto.randomUUID();
    const registration_code = crypto.randomUUID();
    const random_password = generateRandomPassword(10);
    const hashed_password = await bcrypt.hash(random_password, 12)
    

    // Insertamos el usuario en la base de datos
    await insertUserService(id_user, name, surname, email, hashed_password, role, registration_code);
    console.log('Usuario insertado');

    // Respondemos al usuario
    res.status(201).send({
      status: 'ok',
      message: 'El usuario ha sido creado, a la espera de validación',
      data: { random_password ,registration_code }
    });
  } 
  catch (error) {
    error.statusCode = 401
    error.code = 'NEW_USER_ERROR'
    error.message = error.message || 'Error de registro'
    next(error);
  }
};