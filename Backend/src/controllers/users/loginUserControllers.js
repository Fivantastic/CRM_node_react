import bcrypt from 'bcrypt';
import { invalidCredentials } from "../../services/error/errorService.js";
import { validateSignInRequest } from "../../services/user/validateSignInRequest.js";
import { selectUserByEmailModel } from "../../models/user/selectUserByEmailModel.js";
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { loginUserSchema } from '../../schemas/user/loginUserSchema.js';
import { generateAccessToken } from '../../utils/generateAccessToken.js';
import { insertTokenCookie } from '../../utils/insertTokenCookie.js';

export const loginUserController = async (req, res, next) => {
    try {
        //Validar los datos de entrada
        const { email, password } = validateSignInRequest(req.body);

        // Validamos el body
        await validateSchemaUtil(loginUserSchema, req.body);

        //obtener el usuario
        const user = await selectUserByEmailModel(email);

        //validar el usuario
        if (!user) throw invalidCredentials('El usuario/email no existe');
  
        //validar el estado
        if (user.active != 1) {
            throw invalidCredentials('El usuario no ha sido verificado'); 
        }
        
        //comparar la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);

        //validar la contraseña
        if (!isValidPassword) throw invalidCredentials();

        // El usuario existe y la contraseña es correcta
        //Login exitoso
        const token = generateAccessToken(user);
        
        // insertar el token en la base de datos
        // insertTokenCookie(res, token);

        // Colocar la cookie (no devuelve respuesta aún)
        res.cookie('token', token)

        // Responder al usuario
        res.status(201).send({
            // token: token,
            status: 'ok',
            message: 'Sesión iniciada correctamente',
            token: token
        });

    } catch (error) {
        next(error);
    }
};