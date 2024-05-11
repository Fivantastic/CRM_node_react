import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import { userExist } from '../../middlewares/userExist.js';
import { renewTokenMiddleware } from '../../middlewares/renewTokenMiddleware.js';
import {
  changePasswordController,
  forgotPasswordController,
  loginUserController,
  logoutUserController,
  newUserController,
  resetPasswordController,
  toggleActiveStatusController,
  updateUserController,
  validateUserController,
  renewTokenController,
  deleteUserController,
  updateUserAvatarController,
  getUserListController,
} from '../../controllers/mainControllers.js';

// Creamos el router
export const userRouter = express.Router();

// Ruta para listado de usuarios
userRouter.get(
  '/user/list',
  authenticateUser,
  adminAuthMiddleware,
  getUserListController
);

// Ruta de registro solo para administradores
userRouter.post(
  '/user/register',
  authenticateUser,
  adminAuthMiddleware,
  newUserController
);

// Ruta de activación/desactivación solo para administradores
userRouter.put(
  '/user/toggleActivation',
  authenticateUser,
  adminAuthMiddleware,
  toggleActiveStatusController
);

// Ruta de eliminación de un usuario solo para administradores
userRouter.delete(
  '/user/delete/:id_user',
  authenticateUser,
  adminAuthMiddleware,
  deleteUserController
);

// Ruta de validación
userRouter.put('/user/validate/:registration_code', validateUserController);

// Ruta de inicio de sesión
userRouter.post('/user/login', loginUserController);

// Ruta de cierre de sesión
userRouter.post('/user/logout', authenticateUser, logoutUserController);

// Ruta para actualización
userRouter.put('/user/update/:id_user', authenticateUser, updateUserController);

// Ruta para cambio de contraseña
userRouter.put(
  '/user/change-password',
  authenticateUser,
  changePasswordController
);

// Ruta para solicitud de recuperación de contraseña
userRouter.put('/user/forgot-password-request', forgotPasswordController);

// Ruta para recuperación de contraseña
userRouter.put(
  '/user/reset-password/:registration_code',
  resetPasswordController
);

// Ruta para renovación de token
userRouter.get('/user/renew-token', renewTokenMiddleware, renewTokenController);

// Ruta para actualizar avatar
userRouter.put(
  '/user/avatar',
  authenticateUser,
  userExist,
  updateUserAvatarController
);
