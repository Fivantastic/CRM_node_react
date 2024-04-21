import express from 'express';
import { newUserController } from '../controllers/users/newUserController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { checkAdminPrivileges } from '../middlewares/checkAdminPrivileges.js';
import { updateUserController } from '../controllers/users/updateUserController.js';

import { changePasswordController } from '../controllers/users/changePasswordController.js'; // Controlador de cambio de contraseña
import { recoveryPasswordController } from '../controllers/users/recoveryPasswordController .js'; // Controlador para recuperación de contraseña
import { loginUserControllers } from '../controllers/users/loginUserControllers.js';
import { validateUserController } from '../controllers/users/validateUserControllers.js';
import { toggleActiveStatusController } from '../controllers/users/toggleActiveStatusController.js';

// Creamos el router
export const userRouter = express.Router();


// Ruta user
// userRouter.post('/user/register', authenticateUser, checkAdminPrivileges,  newUserController);
// userRouter.put('/user/toggleActivation/:id_user', authenticateUser, checkAdminPrivileges, toggleActiveStatusController)

// Test (sin permisos admin)
userRouter.post('/user/register',  newUserController);
userRouter.put('/user/toggleActivation/:id_user', toggleActiveStatusController)

userRouter.put("/user/validate/:registration_code", validateUserController);

userRouter.post("/user/login", loginUserControllers);

// Ruta para actualización de usuario
userRouter.put('/user/update/:id_user', authenticateUser, updateUserController);

// Ruta para cambio de contraseña
userRouter.put('/user/change-password', authenticateUser, changePasswordController);

// Ruta para recuperación de contraseña
userRouter.put('/user/reset-password-request', recoveryPasswordController); 





