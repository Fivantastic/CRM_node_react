import bcrypt from 'bcrypt';
import { AccountInactiveError, invalidCredentials, invalidPasswordError } from "../../services/error/errorService.js";
import { validateSignInRequest } from "../../services/user/validateSignInRequest.js";
import { selectUserByEmailModel } from "../../models/user/selectUserByEmailModel.js";
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { loginUserSchema } from '../../schemas/user/loginUserSchema.js';
import { generateAccessToken } from '../../utils/generateAccessToken.js';

export const loginUserController = async (req, res, next) => {
    try {
        //Validar los datos de entrada
        const { email, password, remember } = validateSignInRequest(req.body);

        console.log('remember', remember);

        // Validamos el body
        await validateSchemaUtil(loginUserSchema, req.body);

        //obtener el usuario
        const user = await selectUserByEmailModel(email);

        //validar el usuario
        if (!user){
            invalidCredentials('El usuario/email no existe');
        }
  
        //validar el estado
        if (user.active != 1) {
            AccountInactiveError(); 
        }
        
        //comparar la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);

        //validar la contraseña
        if (!isValidPassword) {
            invalidPasswordError();
        }
        // El usuario existe y la contraseña es correcta
        //Login exitoso
        const token = generateAccessToken(user);
        
        // Eliminar el token de la cookie si existe
        // res.clearCookie('token');

        // insertar el token en la cookies
        // insertTokenCookie(res, token);

        // Colocar la cookie (no devuelve respuesta aún)
        // res.cookie('token', token)

        // Responder al usuario
        res.status(201).send({
            // token: token,
            status: 'ok',
            message: 'Sesión iniciada correctamente',
            token: token,
            user: user.name
        });

    } catch (error) {
        next(error);
    }
};