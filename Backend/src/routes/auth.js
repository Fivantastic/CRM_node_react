import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../env.js';
import { getDBPool } from '../db/getPool.js';
import { validateSignInRequest } from '../services/validateSignInRequest.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { invalidCredentials } from '../services/errorService.js';
import { success } from '../utils/success.js';

const dbPool = getDBPool();

export const authRouter = Router();

authRouter.post("/login", authenticateUser, async (req, res, next) => {
    try {
        //Validar los datos de entrada
        const { email, password } = validateSignInRequest(req.body);

        //obtener el usuario
        const [[users]] = await dbPool.query(
            "SELECT * FROM Users WHERE email = ?",
            [email]
        );

        if (!users) throw invalidCredentials('El usuario no existe');

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
                name: users.name,

            })
        );

    } catch (error) {
        next(error);
    }
});
