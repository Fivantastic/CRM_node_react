import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import { 
    changePasswordController, 
    forgotPasswordController, 
    loginUserController, 
    newUserController, 
    resetPasswordController, 
    toggleActiveStatusController, 
    updateUserController, 
    validateUserController 
} from '../../controllers/mainControllers.js';

// Creamos el router
export const userRouter = express.Router();

// Ruta de registro solo para administradores
userRouter.post('/user/register', authenticateUser, adminAuthMiddleware, newUserController);

// Ruta de activación/desactivación solo para administradores
userRouter.put('/user/toggleActivation',authenticateUser, adminAuthMiddleware, toggleActiveStatusController); 

// Ruta de validación 
userRouter.put('/user/validate/:registration_code', validateUserController);

// Ruta de inicio de sesión
userRouter.post('/user/login', loginUserController);

// Ruta para actualización
userRouter.put('/user/update/', authenticateUser, updateUserController);

// Ruta para cambio de contraseña
userRouter.put('/user/change-password/',authenticateUser, changePasswordController);

// Ruta para solicitud de recuperación de contraseña
userRouter.put('/user/forgot-password-request', forgotPasswordController);

// Ruta para recuperación de contraseña
userRouter.put('/user/reset-password/:registration_code', resetPasswordController);
