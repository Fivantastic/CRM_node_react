import express from 'express';
import { newUserController } from '../controllers/users/newUserController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { checkAdminPrivileges } from '../middlewares/checkAdminPrivileges.js';
import { updateUserController } from '../controllers/users/updateUserController.js';
import { changePasswordController } from '../controllers/users/changePasswordController.js'; // Controlador de cambio de contraseña
import { recoveryPasswordController } from '../controllers/users/recoveryPasswordController .js'; // Controlador para recuperación de contraseña

// Creamos el router
export const userRouter = express.Router();

// Ruta para registro de usuario
userRouter.post('/user/register', newUserController);

// Ruta para actualización de usuario
userRouter.put('/user/update/:id_user', authenticateUser, updateUserController);

// Ruta para cambio de contraseña
userRouter.put('/user/change-password', authenticateUser, changePasswordController);

// Ruta para recuperación de contraseña
userRouter.put('/user/reset-password-request', recoveryPasswordController); 
