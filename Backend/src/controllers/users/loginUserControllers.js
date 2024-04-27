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
        console.log('Debug log in controller:', password);
        await validateSchemaUtil(loginUserSchema, req.body);
        console.log('Ha pasado el esquema');

        //obtener el usuario
        const user = await selectUserByEmailModel(email);

        if (!user) throw invalidCredentials('El usuario/email no existe');
  
        if (user.active != 1) {
            throw invalidCredentials('El usuario no ha sido verificado'); 
        }
        
        //comparar la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) throw invalidCredentials();

        // El usuario existe y la contraseña es correcta
        //Login exitoso
        const token = generateAccessToken(user);
        
        // insertar el token en la base de datos
        insertTokenCookie(res, token);

        res.send({
            // token: token,
            status: 'ok',
            message: 'Sesión iniciada correctamente',
            token: token
        });

    } catch (error) {
        next(error);
    }
};