
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { invalidCredentials } from "../../services/errorService.js";
import { validateSignInRequest } from "../../services/validateSignInRequest.js";
import { success } from "../../utils/success.js";
import { selectUserByEmailModel } from "../../models/user/selectUserByEmailModel.js";
import { JWT_SECRET } from '../../../env.js';

export const loginUserControllers = async (req, res, next) => {
    try {
        //Validar los datos de entrada
        const { email, password } = validateSignInRequest(req.body);

        //obtener el usuario
        const [[users]] = selectUserByEmailModel(email);

        if (!users) throw invalidCredentials('El usuario/email no existe');

        if (users.active != 1) {
            throw invalidCredentials('El usuario no ha sido verificado'); 
        }


        //comparar la contraseña
        const isValidPassword = await bcrypt.compare(password, users.password);

        if (!isValidPassword) throw invalidCredentials();

        // El usuario existe y la contraseña es correcta
        //Login exitoso
        const token = jwt.sign(
            {
                id_user: users.id_user,
                name: users.name,
                avatar: users.avatar,
                email: users.email,
            },
            JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.json(
            success({
                token: token,
            })
        );

    } catch (error) {
        next(error);
    }
};