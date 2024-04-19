import express from 'express';
import { newUserController } from '../controllers/users/newUserController.js';

// Creamos un router
export const userRouter = express.Router();

// Ruta user
userRouter.post('/user/register', newUserController);
