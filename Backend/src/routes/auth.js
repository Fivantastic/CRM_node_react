import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDBPool } from '../db/getPool.js';
import { validateSignInRequest } from '../services/validateSignInRequest.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { invalidCredentials } from '../services/invalidCredentials.js';

const dbPool = getDBPool();

export const authRouter = Router();

authRouter.post("/login", authenticateUser, async (req, res, next) => {
    try {
        //Validar los datos de entrada
        const { email, contraseña } = validateSignInRequest(req.body);

        //obtener el usuario
        const [[usuario]] = await dbPool.query(
            "SELECT * FROM Usuarios WHERE email = ?",
            [email]
        );

        if (!usuario) throw invalidCredentials();

        if (usuario.activado != 1) {
            throw invalidCredentials(); // El usuario no ha sido verificado
        }

        //comparar la contraseña
        const isValidPassword = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!isValidPassword) throw invalidCredentials();

        // El usuario existe y la contraseña es correcta
        //Login exitoso
        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                avatar: usuario.avatar,
                email: usuario.email,
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
});
