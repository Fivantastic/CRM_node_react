import bcrypt from "bcrypt";
import { newUserSchema } from '../../schemas/user/newUserSchema.js';
import { insertUserService } from '../../services/user/insertUserService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { generateRandomPassword } from "../../utils/generateRandomPassword.js";
// import { sendWelcomeEmail } from "../../services/email/emailService.js";

export const newUserController = async (req, res, next) => {
  try {
    // Obtenemos el cuerpo de la petición
    //! MAS ADELANTE ESTA PARTE EStara dentro de insertUserService, de momento estara fuera para que tengamos como respuesta la DATA de password y registration_code
    const { name, last_name, email, role } = req.body;

    // Validamos el body
    await validateSchemaUtil(newUserSchema, req.body);

    // Creamos una id y un código de activación para el usuario.
    //! MAS ADELANTE ESTA PARTE EStara dentro de insertUserService, de momento estara fuera para que tengamos como respuesta la DATA de password y registration_code
    const id_user = crypto.randomUUID();
    const registration_code = crypto.randomUUID();
    const password = generateRandomPassword(10);
    const hashed_password = await bcrypt.hash(password, 12)
    

    // Insertamos el usuario en la base de datos
    await insertUserService(id_user, name, last_name, email, hashed_password, role, registration_code);

    // ! Desactivado por motivos de prueba la funcion de enviar correo de bienvenida
    // Enviar correo electrónico de bienvenida
    // await sendWelcomeEmail(name, last_name, password, email, registration_code);

    // Respondemos al usuario
    res.status(201).send({
      status: 'ok',
      message: 'El usuario ha sido creado, a la espera de validación',
      data: { password ,registration_code }
    });
  } 
  catch (error) {
    error.statusCode = 401
    error.code = 'NEW_USER_ERROR'
    error.message = error.message || 'Error de registro'
    next(error);
  }
};