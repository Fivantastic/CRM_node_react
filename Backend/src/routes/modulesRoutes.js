import express from 'express';
import { moduleRouter } from './moduleRoutes.js';
import { visitsRouter } from './visitsRouter.js';
import { salesRouter } from './salesRutes.js';
import { deliveryNoteRoutes } from './deliveryNoteRoutes.js';

// Creamos el router
export const modulesRoutes = express.Router();

// Ruta de modulos generales
modulesRoutes.use(moduleRouter);

// Ruta de visitas
modulesRoutes.use(visitsRouter);

// Rutas de ventas
modulesRoutes.use(salesRouter);

// Ruta de Albaran
modulesRoutes.use(deliveryNoteRoutes);