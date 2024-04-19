import express from 'express';
import { newUserController } from '../controllers/users/newUserController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { checkAdminPrivileges } from '../middlewares/checkAdminPrivileges.js';

// Creamos un router
export const userRouter = express.Router();

// Ruta user
userRouter.post('/user/register', authenticateUser, checkAdminPrivileges,  newUserController);
