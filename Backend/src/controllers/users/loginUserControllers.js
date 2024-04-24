
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { invalidCredentials } from "../../services/errorService.js";
import { validateSignInRequest } from "../../services/validateSignInRequest.js";
import { success } from "../../utils/success.js";
import { selectUserByEmailModel } from "../../models/user/selectUserByEmailModel.js";
import { JWT_SECRET } from '../../../env.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { loginUserSchema } from '../../schemas/loginUserSchema.js';

export const loginUserControllers = async (req, res, next) => {
    try {
        //Validar los datos de entrada
        const { email, password } = validateSignInRequest(req.body);

        // Validamos el body
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
        const token = jwt.sign(
            {
                id_user: user.id_user,
                name: user.name,
                role: user.role,
                email: user.email,
            },
            JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        
        const oneDay = 1000 * 60 * 60 * 24

        // Nueva validación por cookies
        res.cookie('token', token, { maxAge: oneDay, httpOnly: true })

        res.send({
            // token: token,
            message: 'Sesión iniciada correctamente'
        
        });

    } catch (error) {
        next(error);
    }
};