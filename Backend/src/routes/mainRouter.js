import express from 'express';
import { userRouter } from './userRoutes.js';
import { customerRouter } from './customerRoutes.js';
import { productRouter } from './productRoutes.js';

// Creamos un router
export const mainRouter = express.Router();

// Rutas de usuarios
mainRouter.use(userRouter);

// Rutas de  clientes
mainRouter.use(customerRouter);

// Rutas de productos
mainRouter.use(productRouter);