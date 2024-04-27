import express from 'express';
import { userRouter } from './mainRoutes/userRoutes.js';
import { customerRouter } from './mainRoutes/customerRoutes.js';
import { productRouter } from './mainRoutes/productRoutes.js';

// Creamos un router
export const mainRouter = express.Router();

// Rutas de usuarios
mainRouter.use(userRouter);

// Rutas de  clientes
mainRouter.use(customerRouter);

// Rutas de productos
mainRouter.use(productRouter);