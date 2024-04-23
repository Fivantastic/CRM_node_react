import express from 'express';
import { newUserController } from '../controllers/users/newUserController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { checkAdminPrivileges } from '../middlewares/checkAdminPrivileges.js';
import { updateUserController } from '../controllers/users/updateUserController.js';
import { changePasswordController } from '../controllers/users/changePasswordController.js';
import { forgotPasswordController } from '../controllers/users/forgotPasswordController.js';
import { loginUserControllers } from '../controllers/users/loginUserControllers.js';
import { validateUserController } from '../controllers/users/validateUserControllers.js';
import { toggleActiveStatusController } from '../controllers/users/toggleActiveStatusController.js';
import { resetPasswordController } from '../controllers/users/resetPasswordController.js';
import { adminAuthMiddleware } from '../middlewares/adminAuthMiddleware.js';

// Creamos el router
export const userRouter = express.Router();

// Ruta user
// userRouter.post('/user/register', authenticateUser, checkAdminPrivileges,  newUserController);
// userRouter.put('/user/toggleActivation/:id_user', authenticateUser, checkAdminPrivileges, toggleActiveStatusController)

userRouter.post('/user/register', authenticateUser, adminAuthMiddleware, newUserController); // Ya esta la verificacion de privilegios adminAuthMiddleware

userRouter.put('/user/toggleActivation/:id_user', toggleActiveStatusController); //! hay que cambiar el id para que dentro saque el id del token, mira en linea 30

userRouter.put('/user/validate/:registration_code', validateUserController);

userRouter.post('/user/login', loginUserControllers);

// Ruta para actualización de usuario
userRouter.put('/user/update/', authenticateUser, updateUserController);

// Ruta para cambio de contraseña
userRouter.put(
  '/user/change-password/',
  authenticateUser,
  changePasswordController
);

// Ruta para solicitud de recuperación de contraseña
userRouter.put('/user/forgot-password-request', forgotPasswordController);

// Ruta para recuperación de contraseña
userRouter.put('/user/reset-password/:registration_code', resetPasswordController);
